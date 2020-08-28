import { Component,OnInit } from '@angular/core';
import {TableService} from './table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'data-table';
  
  //Sizes
  lengths:any[]=[2,3,4,5];
  
  //Table Data (Array of Objects);
  data:any[];  

  //Table Header
  headers=[
    {
      text:"Product Name",
      key:"name",
      type:"text"
    },
    {
      text:"SubCategory Name",
      key:"subCategoryName",
      type:"text"
    },
    {
      text:"Category Name",
      key:"categoryName",
      type:"text"
    },
    {
      text:"Visible",
      key:"visible",
      type:"switch"
    }
  ];


  /*Data To Be Passed */
  props:any={
    page:1,
    size:this.lengths[0],
    searchTxt:"",
    order:1,
    sortBy:this.headers[0].key
  };  

  getData(){
    this.props.size=parseInt(this.props.size);
    this.props.order=parseInt(this.props.order);
    this.props.page=parseInt(this.props.page);
    this.tableService.getData("url",this.props,{"authorization":"auth_token"}).subscribe(r=>{
      if(r.code=='ECM005')  
        console.log(r);  
      this.data=r.payload.products;
    });
  }

  constructor(private tableService:TableService){
    this.getData=this.getData.bind(this);
    this.getData();
  }

  deleteRow(value:any){
      console.log("In Deletion");
      console.log(value);
  }

  modifyData(value:any){
      console.log("In Modify");
      console.log(value);
  }

  getParams(value){
      this.props[value[0]]=value[1];
      if(value[0]=='searchTxt' || value[0]=='size'){  
          this.props.page=1;  
      }else if(value[0]=='sortBy'){
          if(value[2]==true){
            this.props.order=this.props.order * -1;
          }else{
            this.props.order=1;
          }
          this.props.page=1;   
      }
      this.getData();
  }

}
