import { Component,OnInit } from '@angular/core';
import {TableService} from './table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'data-table';
  lengths:any[]=[2,3,4,5];
  data:any[];  
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
    this.tableService.getData("http://13.233.108.69:5500/prod/getProdsAll",this.props,{"authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBJZCI6IlNBRE1JTjAwMCIsImF1dGhUeXBlIjoiQUNVNDU2IiwiaWF0IjoxNTk3OTA4ODgzLCJleHAiOjE2ODQzMDg4ODN9.mIh2UdlGfuaAkXI9NDwlcz4NN4K3X1P57Fcq9V_B3e4"}).subscribe(r=>{
        console.log(r);
        this.data=r.payload.products;
    });
  }

  constructor(private tableService:TableService){
    this.getData=this.getData.bind(this);
    this.getData();
  }

  deleteRow(value:any){
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
      console.log(value[0]);
      console.log(this.props.page);
      this.getData();
  }
  
}
