import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatTableDataSource } from '@angular/material/table';
import { Product } from './Model/Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private dialog: MatDialog, private api: ApiService) { }

  displayedColumns: string[] = ['id', 'productName', 'category', 'condition', 'price', 'comment', 'date', 'action'];
  // is any
  dataSource!: MatTableDataSource<Product>;
  dataSourse2: Product[] = [];
  dataSourse3: Product[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllProducts()
    
  }

  title = 'firstProjectWithSCSS';
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "30%"
    }).afterClosed().subscribe(res => {
      if (res === "save") {
        this.getAllProducts()
      }
    })
  }

  getAllProducts() {
    this.api.getProduct()
      .subscribe(
        (respone) => {
          this.dataSourse3=
        this.dataSourse2=respone;
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(res => {
      if (res === "update") {
        this.getAllProducts()
      }
    })
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
        alert("Product delete Sucsessfully")
        this.getAllProducts()
      },

      error: () => {
        alert("Something want wrong while delete product")
      }
    })
  }

  filter(filed: string, value: string) {
    console.log(filed)
    console.log(value)
    switch (filed) {
      case 'productName': this.dataSourse3=this.dataSourse2.filter(x => x.productName.toLocaleLowerCase().includes(value));break;
      case 'category': this.dataSourse3=this.dataSourse2.filter(x => x.category.includes(value));break;
      case 'condition': this.dataSourse3=this.dataSourse2.filter(x => x.condition.toLocaleLowerCase().includes(value));break;
      case 'price': this.dataSourse3=this.dataSourse2.filter(x => x.price.toLocaleString().includes(value));break;
      case 'comment': this.dataSourse3=this.dataSourse2.filter(x => x.comment.toLocaleLowerCase().includes(value));break;
      case 'date': this.dataSourse3=this.dataSourse2.filter(x => x.date.toLocaleLowerCase().includes(value));break;
    }
  }



}
