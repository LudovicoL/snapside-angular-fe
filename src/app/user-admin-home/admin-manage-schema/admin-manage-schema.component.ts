import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ItemService } from 'src/app/services/item.service';
import { ICategory } from 'src/app/interfaces/category';
import { IItem } from 'src/app/interfaces/item';
import {MatTreeModule} from '@angular/material/tree';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-manage-schema',
  templateUrl: './admin-manage-schema.component.html',
  styleUrls: ['./admin-manage-schema.component.css']
})
export class AdminManageSchemaComponent implements OnInit {

  constructor(private _cat: CategoryService, private _item: ItemService,) {
    var collapsed=true
    $(function() {

      $('.list-group-item').on('click', function() {
        // return 0
        $('.fa', this)
          .toggleClass('fa-chevron-right')
          .toggleClass('fa-chevron-down');
      });

      $('#toggle_c-e').on('click', function() {
        if(collapsed){
        (<any>$('.list-group.collapse.tog')).collapse('show')
        collapsed=!collapsed}
        else{
          (<any>$('.list-group.collapse.tog')).collapse('hide')
          collapsed=!collapsed
        }
        $('.fa')
          .toggleClass('fa-chevron-right')
          .toggleClass('fa-chevron-down');
      });


    }); }
  public categories=[]
  public items=[]
  public attributes=[]
  collapsed=true
  newCategory='Insert new category name here...';
  // '+moment().format('DD-MM-YYYY HH:mm:ss')
  newItems=[]
  newAttributes=[]
  unsub;
  deleteTitle;
  deleteId;

  ngOnInit() {
    this.categories=[]
    this.items=[]
    this.attributes=[]
    this.newItems=[]
    this.newAttributes=[]
    this.unsub=this._cat.getInitSchema().subscribe(resp=>{this.categories=resp[0];
    this.items=resp[1];
    this.attributes=resp[2];
    var that=this;

    this.items.forEach(function(entry, index){
      entry['attribute']=that.attributes.filter(a=>a.itemByItemIdItem==entry.idItem)
    })
    var itemsWithAttr=this.items

    this.categories.forEach(function(entry, index){
      entry['item']=itemsWithAttr.filter(item=>item.category_idcategory==entry.idcategory)

    })
    console.log(this.categories)
    });
  }

  addItem(){
    this.newItems.push([{itemName:'No item name'},[]])
    console.log(this.newItems)
  }

  removeItem(index){
    this.newItems.splice(index, 1);
  }

  addAttribute(index){
    this.newItems[index][1].push({attributeName:'No attribute name'})
  }

  removeAttribute(indexItem,indexAttribute){
    console.log(indexItem,indexAttribute)
    this.newItems[indexItem][1].splice(indexAttribute, 1);
  }

  async saveNewSchema(){
    var that=this;
    var newcat= await this._cat.saveCategory(this.newCategory).toPromise()
    var idNewCat=newcat['idcategory']
    this.newItems.forEach(async function(entry,index){
    var item= await that._cat.saveItem(idNewCat,entry[0].itemName).toPromise()
    var iditem=item['idItem'];
    entry[1].forEach(async function(attrib,index){
      console.log(attrib, iditem)
          await that._cat.saveAttribute(iditem,attrib.attributeName).toPromise()
        })


    })


    await this.delay(1500)
    this.ngOnInit()
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  onEvent(event) {
    console.log('click')
    event.stopPropagation();
 }

 deleteSchema(id){
  this._cat.deleteCategory(id).subscribe(data=>{console.log(data);this.ngOnInit()})
 }

 setDeleteTitle(title) {
  this.deleteTitle = title;
}

getDeleteTitle() {
  return this.deleteTitle;
}

setDeleteId(id) {
  this.deleteId = id;
}

getDeleteId() {
  return this.deleteId;
}

showDeleteModal(){
  (<any>$('#deleteModal')).modal('toggle')
}
}
