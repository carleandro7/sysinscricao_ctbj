import { Injectable, ViewChild} from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from './util/confirm-dialog/confirm-dialog.component';
import { SuccessDialogComponent, SuccessDialoggData } from './util/success-dialog/success-dialog.component';
import { AppService } from '../services/app.service';
import { AppModel } from '../module/app-model';

@Injectable({
    providedIn: 'root',
})

export class Componentpai {
        public app:any = {};
        public apps: Array<AppModel> = [];
        @ViewChild(MatPaginator) paginator!: MatPaginator;
        public displayedColumns = ['id', 'nome', 'actions'];
        public dataSource:any;
        public clickedRows = new Set<AppModel>();
        public selectedRowIndex: number = -1;
        protected index_aux:number = -1;
        public size_page:number = 0;
        public firstButton: number = 0;
        public nextButton: number = 0;
        public prevButton: number = 0;
        public lastButton: number = 0;
      
        public formCadastro: FormGroup;
        protected appService: AppService | null = null;
      
        termoPesquisa: string = '';
      
        pesquisar(): void {
          this.appService?.getList(0,0, this.termoPesquisa)
            .subscribe({
              next: (res) => {
                this.apps =  res[0];
                this.dataSource= new MatTableDataSource(this.apps);
                this.dataSource.paginator = this.paginator;
                this.index_aux = -1;
                this.verificaButton();
                this.clearForm()
              },
              error: (err) => this.msg_dialogo("Erro", err)
          });
        }
      
        constructor(protected fb: FormBuilder, protected dialog: MatDialog){
          this.formCadastro = this.fb.group({
          
          });
        }
      
        public loadapp(): void {
          this.appService?.getList(0,0, this.termoPesquisa)
            .subscribe({
              next: (res) => {
                this.apps =  res[0];
                this.dataSource= new MatTableDataSource(this.apps);
                this.dataSource.paginator = this.paginator;
                this.index_aux = -1;
                this.verificaButton();
              },
              error: (err) => console.log(err)
          });
        }
      
        public submitForm = (): void => {
          if (this.formCadastro.valid) {
            if(!this.formCadastro.value.id){
            const { id, ...objeto } = this.formCadastro.value;
              this.appService?.objectAdd(objeto).subscribe({
                next: (res) => {
                  this.loadapp()
                  this.formCadastro.reset()
                  this.msg_dialogo("", "Salvo com Sucesso!")
                },
                error: (err) => {
                  this.msg_dialogo("Erro", err)
                }
              });
            }else{
              this.appEdit(this.formCadastro.value.id)
            }
          }else{
            this.msg_dialogo("Aviso", "Verique se todos os campos necessários estão preenchidos!")
          }
        }

        public appEdit(id_aux:number){
            const { id, ...objeto } = this.formCadastro.value;
            this.appService?.objectEdit(id_aux, this.formCadastro.value).subscribe({
              next: (res) => { 
                this.loadapp()
                 this.formCadastro.reset()
                this.msg_dialogo("", "Alterado com Sucesso!")
              },
              error: (err) => {
                this.msg_dialogo("Erro", err)
              }
            });
          }
  
        public appVisualizar(id:number){
            this.appService?.objectVisualizar(id).subscribe({
            next: (res) => { 
                this.app = res
            },
            error: (err) => {
                this.msg_dialogo("Erro", "Erro ao Visualizar!")
            }
            });
        }
        
        public appDelete(id: number){
            const dialogData: ConfirmDialogData  = {
            title: 'Confirmar Exclusão',
            message: `Tem certeza que deseja excluir este item de código ${id} ?`
            };
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: dialogData
            });
        
            dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // Chame sua lógica de exclusão aqui
                this.appService?.objectDelete(id).subscribe({
                next: (res) => {
                    this.loadapp();
                    this.formCadastro.reset()
                    this.msg_dialogo("", "Excluído com sucesso")
                    },
                    error: (err) => {
                    this.msg_dialogo("Erro", err)
                    }
                });
            } else {
                //console.log('Exclusão cancelada.');
            }
            });
            
        }

        
        selectRow(row: any) {
            this.selectedRowIndex = row.id; // Supondo que você tenha uma propriedade id na sua fonte de dados
            const aux = this.apps.filter(app => app.id === row.id);
            this.app = aux[0];
            this.preencherFormulario(this.app)
            this.index_aux = this.apps.indexOf(this.app);
          }
          
          public linha_tabela(row: any) {
            this.selectRow(row);
            this.verificaButton();
          }
        
          public verificaButton(){
            if(this.index_aux != -1){
              const aux = this.apps[this.index_aux];
              if(this.index_aux == 0){
                this.firstButton = 0;
                this.prevButton = 0;
              }else{
                this.firstButton = 1;
                this.prevButton = 1;
              }
              if(this.index_aux == (this.apps.length-1)){
                this.nextButton = 0;
                this.lastButton = 0;
              }else{
                this.nextButton = 1;
                this.lastButton = 1;
              }
            }else{
              this.firstButton = 0;
              this.prevButton = 0;
              this.nextButton = 0;
              this.lastButton = 0;
            }
          }
      
        preencherFormulario(app: any): void {
          this.formCadastro.patchValue({
            // Atualize com outros campos conforme necessário
          });
        }
      
        public novoCadastro = (): void => {
          this.clearForm();
          this.termoPesquisa = "";
        }
      
        public clearForm(){
           this.formCadastro.reset()
          this.index_aux = -1;
          this.selectedRowIndex = -1;
          this.verificaButton();
        }
      
        public onPageChange1(event: any): void  {
          if(this.size_page != this.paginator.pageSize && this.size_page > this.paginator.pageSize){
            if (this.apps.length > 0) {
              this.linha_tabela(this.apps[0]);
            }
            this.size_page = this.paginator.pageSize;
          }else if(this.size_page != this.paginator.pageSize){
            this.size_page = this.paginator.pageSize;
          }
        }
      
        goToPage(pageNumber: number) {
          this.paginator.pageIndex = pageNumber;
          this.paginator.page.emit({ pageIndex: pageNumber, pageSize: this.paginator.pageSize, length: this.paginator.length });
        }
      
        calcularTotalPaginas(){
          const totalItems = this.paginator.length;
          const itemsPerPage = this.paginator.pageSize;
          return Math.ceil(totalItems / itemsPerPage);
        }
      
        calcularPaginaAtual(index:any){
          const itemsPerPage = this.paginator.pageSize;
          const pageIndex = Math.floor(index / itemsPerPage);
          return pageIndex;
        }
      
        // Função para navegar para o primeiro produto
        public firstapp = (): void => {
          if (this.apps.length > 0) {
            this.linha_tabela(this.apps[0]);
            this.goToPage(0);
          }
        }
      
        // Função para navegar para o produto anterior
        public prevapp = (): void => {
          if (this.index_aux > 0) {
            this.index_aux = this.apps.indexOf(this.app);
            this.linha_tabela( this.apps[this.index_aux-1]);
            this.goToPage(this.calcularPaginaAtual(this.index_aux))
          }
        }
      
        // Função para navegar para o próximo produto
        nextapp = (): void => {
          if (this.index_aux < this.apps.length - 1) {
            this.index_aux = this.apps.indexOf(this.app);
            this.linha_tabela( this.apps[this.index_aux+1])
            this.goToPage(this.calcularPaginaAtual(this.index_aux))
          }
        }
      
        // Função para navegar para o último produto
        lastapp = (): void => {
          if (this.apps.length-1 > this.index_aux) {
            this.linha_tabela( this.apps[this.apps.length - 1])
            const total = this.calcularTotalPaginas()
            this.goToPage(total-1)
          }
        }
      

      
        msg_dialogo(title:any, msg:any){
          const dialogData: SuccessDialoggData  = {
            title: title,
            message: msg
          };
        
          const dialogRef = this.dialog.open(SuccessDialogComponent, {
            data: dialogData
          });
        }
      }