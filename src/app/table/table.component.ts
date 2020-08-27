import { Component, OnInit, Input, Output, EventEmitter,OnChanges } from '@angular/core';
import { faEdit,faEraser,faAngleDoubleRight,faAngleDoubleLeft, faAngleDoubleUp, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit,OnChanges {
  faedit=faEdit;
  faeraser=faEraser;
  angleup=faAngleDoubleUp;
  angledown=faAngleDoubleDown;

  @Input()
    headers:object[];

  @Input()
    data:object[];

  @Input()
    lengths:number[];

  @Input()
    props:any;

  @Output()
    deleteItem=new EventEmitter<any>();

  @Output()
    setParams=new EventEmitter<any>();

  startingIndex:number;
  constructor(){
    this.setText=this.setText.bind(this);
    
  }

  ngOnChanges():void{
    this.startingIndex=this.props.page*this.props.size - this.props.size;
    console.log(this.props.order==-1,"Order");
  }

  ngOnInit(): void {
    
  }

  onOrderChanges(sortBy,orderStatus){
      console.log(sortBy,orderStatus);
      this.setParams.emit(['sortBy',sortBy,orderStatus]);
  }

  deleteRow(v:object,i:number){
    this.deleteItem.emit([v,i]);
  }

  modifyRow(v:object,i:number){}

  setText(e){
    this.setValue(e.target.name,e.target.value); 
  }

  setValue(name,value){
    this.setParams.emit([name,value]);
  }

  search(e){
    this.setParams.emit(['searchTxt',this.props.searchTxt]);
  }
}
