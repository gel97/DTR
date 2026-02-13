import { Component, Input, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface TableAction {
  label: string;
  icon?: string;
  color?: string;
  action: string; // identifier
}

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'actions';
  actions?: TableAction[];
}

@Component({
  selector: 'app-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements AfterViewInit {
  @Input() columns: TableColumn[] = [];
  @Input() set data(value: any[]) {
    this.dataSource.data = value || [];
  }

  @Output() actionClicked = new EventEmitter<{ action: string; row: any }>();

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    setTimeout(() => {
      this.displayedColumns = this.columns.map((c) => c.key);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((o, key) => o?.[key], obj);
  }

  onAction(action: string, row: any) {
    this.actionClicked.emit({ action, row });
  }
}
