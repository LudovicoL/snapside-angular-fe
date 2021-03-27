import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { InteractionService } from '../../services/interaction.service';
import { IUser } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { GuiService } from 'src/app/services/gui.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from 'src/app/services/category.service';
import { delay } from 'rxjs/operators';
import * as $AB from 'jquery';
declare var $: any

@Component({
  selector: 'app-seller-header',
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.css']
})
export class SellerHeaderComponent implements OnInit {
  @Input() userid: string;
  public userData: IUser;
  public categories=[]
  public idAd=1;
  categoryName='All'
  currentSortBy='ID: Ascendent'
  currentFilterStatus='All'
  searchContent='';
  nnotifs;

  constructor(private _interactionService: InteractionService,
    private userService: UserService,
    private router: Router,
    private _search: SearchService,
    private _gui: GuiService,
    private _sanitizer: DomSanitizer,
    private _category: CategoryService,private cdRef:ChangeDetectorRef) { }
  ngOnInit() {

    $(document).ready(function() {
      $("body").tooltip({ selector: '[data-toggle=tooltip]' });
  });

    this._gui.focusedAdId.subscribe(data =>{this.idAd=data})
    this.userService.getUserById(this.userid).subscribe(data => this.userData=data)
    this._category.getAllCat().subscribe(data => {this.categories=data})

    // setInterval(() => {
    //   this._gui.nnotifs.subscribe(data=>this.nnotifs=data)
    //     }, 100);

    this._search.searchContent.subscribe(data=>this.searchContent=data)

  }

ngDoCheck(){this._gui.nnotifs.subscribe(data=>this.nnotifs=data);
  // if(!(this.router.url.search('ads-list')>-1)){
  //   this.searchContent=''
  // }

}



  doSearch() {
    // alert(this.searchContent)
    this._search.sendSearchContent(this.searchContent)
  }

  filterCatBy(categoryId){
    // console.log(categoryId)
    this._gui.sendFilterByCat(categoryId)
  }

  filterStatusBy(status){

    this._gui.sendFilterByStatus(status)
  }

  sortBy(by){
    this._gui.sendSortBy(by)
  }

  getNameUser(){
  //  alert(this.userData['name'])
    return this.userData['name'];
  }

 clearAllNotifs()
  {
    this._gui.clearAllNotifs('1')
  }

  getImage(base64img)

{




  if (base64img===null){

    return ("assets/utils_imgs/nouserimg.svg")
  }
  else if (base64img.lastIndexOf('/9j',0)===0){
  return this._sanitizer.bypassSecurityTrustResourceUrl("data:image/jpg;base64, " + base64img);
  }
  else {
    return this._sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64, " + base64img);
    }
}
}
