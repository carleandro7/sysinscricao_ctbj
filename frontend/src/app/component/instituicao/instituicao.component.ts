
import { Component, AfterViewInit, OnInit, ViewChild} from '@angular/core';
import {  FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InstituicaoModel } from 'src/app/module/instituicao-model';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { ConfirmDialogComponent, ConfirmDialogData  } from '../util/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent, SuccessDialoggData } from '../util/success-dialog/success-dialog.component';



@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.scss'],
})
export class InstituicaoComponent implements OnInit, AfterViewInit {
  public instituicao:any = {};
  public instituicaos: Array<InstituicaoModel> = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public displayedColumns = ['id', 'nome', 'actions'];
  public dataSource:any;
  public clickedRows = new Set<InstituicaoModel>();
  public selectedRowIndex: number = -1;
  private index_aux:number = -1;
  private size_page:number = 20;
  public firstButton: number = 0;
  public nextButton: number = 0;
  public prevButton: number = 0;
  public lastButton: number = 0;

  public formCadastro: FormGroup;


  termoPesquisa: string = '';

  pesquisar(): void {
    
    this.instituicaoService.getInsituicao(0,0, this.termoPesquisa)
      .subscribe({
        next: (res) => {
          this.instituicaos =  res[0];
          this.dataSource= new MatTableDataSource(this.instituicaos);
          this.dataSource.paginator = this.paginator;
          this.index_aux = -1;
          this.verificaButton();
          this.clearForm()
        },
        error: (err) => this.msg_dialogo("Erro", err)
    });
  }

  constructor(private fb: FormBuilder, private dialog: MatDialog, private instituicaoService: InstituicaoService){
    this.formCadastro = this.fb.group({
      // Defina os campos do seu formulário aqui
      id: [''],
      nome: ['', [Validators.required]],
      // Adicione outros campos conforme necessário
    });
  }


  ngOnInit(): void{
    this.loadInstituicao();
  }

  ngAfterViewInit(): void {
    this.size_page = this.paginator.pageSize;
  }

  public loadInstituicao(): void {
    this.instituicaoService.getInsituicao(0,0, this.termoPesquisa)
      .subscribe({
        next: (res) => {
          this.instituicaos =  res[0];
          this.dataSource= new MatTableDataSource(this.instituicaos);
          this.dataSource.paginator = this.paginator;
          this.index_aux = -1;
          this.verificaButton();
        },
        error: (err) => console.log(err)
    });
  }


  selectRow(row: any) {
    this.selectedRowIndex = row.id; // Supondo que você tenha uma propriedade id na sua fonte de dados
    const aux = this.instituicaos.filter(instituicao => instituicao.id === row.id);
    this.instituicao = aux[0];
    this.preencherFormulario(this.instituicao)
    this.index_aux = this.instituicaos.indexOf(this.instituicao);
  }
  
  public linha_tabela(row: any) {
    this.selectRow(row);
    this.verificaButton();
  }

  public verificaButton(){
    if(this.index_aux != -1){
      const aux = this.instituicaos[this.index_aux];
      if(this.index_aux == 0){
        this.firstButton = 0;
        this.prevButton = 0;
      }else{
        this.firstButton = 1;
        this.prevButton = 1;
      }
      if(this.index_aux == (this.instituicaos.length-1)){
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

  public submitForm(){
    if (this.formCadastro.valid) {
      if(!this.formCadastro.value.id){
        this.instituicaoService.instituicaoAdd(this.formCadastro.value.nome).subscribe({
          next: (res) => {
            this.loadInstituicao()
            this.formCadastro.reset()
            this.msg_dialogo("", "Salvo com Sucesso!")
          },
          error: (err) => {
            this.msg_dialogo("Erro", err)
          }
        });
      }else{
        this.instituicaoEdit(this.formCadastro.value.id, this.formCadastro.value.nome)
      }
    }else{
      this.msg_dialogo("Aviso", "Verique se todos os campos necessários estão preenchidos!")
    }
  }

  preencherFormulario(instituicao: any): void {
    this.formCadastro.patchValue({
      nome: instituicao.nome,
      id: instituicao.id
      // Atualize com outros campos conforme necessário
    });
  }

  public novoCadastro(){
    this.clearForm();
    this.termoPesquisa = "";
  }

  public clearForm(){
     this.formCadastro.reset()
    this.index_aux = -1;
    this.selectedRowIndex = -1;
    this.verificaButton();
  }

  public instituicaoEdit(id:number, value:string,){
    this.instituicaoService.instituicaoEdit(id, value).subscribe({
      next: (res) => { 
        this.loadInstituicao()
         this.formCadastro.reset()
        this.msg_dialogo("", "Alterado com Sucesso!")
      },
      error: (err) => {
        this.msg_dialogo("Erro", err)
      }
    });
  }

  onPageChange(event: any) {
    if(this.size_page != this.paginator.pageSize && this.size_page > this.paginator.pageSize){
      if (this.instituicaos.length > 0) {
        this.linha_tabela(this.instituicaos[0]);
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
  public firstInstituicao(): void {
    if (this.instituicaos.length > 0) {
      this.linha_tabela(this.instituicaos[0]);
      this.goToPage(0);
    }
  }

  // Função para navegar para o produto anterior
  prevInstituicao(): void {
    if (this.index_aux > 0) {
      this.index_aux = this.instituicaos.indexOf(this.instituicao);
      this.linha_tabela( this.instituicaos[this.index_aux-1]);
      this.goToPage(this.calcularPaginaAtual(this.index_aux))
    }
  }

  // Função para navegar para o próximo produto
  nextInstituicao(): void {
    if (this.index_aux < this.instituicaos.length - 1) {
      this.index_aux = this.instituicaos.indexOf(this.instituicao);
      this.linha_tabela( this.instituicaos[this.index_aux+1])
      this.goToPage(this.calcularPaginaAtual(this.index_aux))
    }
  }

  // Função para navegar para o último produto
  lastInstituicao(): void {
    if (this.instituicaos.length-1 > this.index_aux) {
      this.linha_tabela( this.instituicaos[this.instituicaos.length - 1])
      const total = this.calcularTotalPaginas()
      this.goToPage(total-1)
    }
  }

  public instituicaoVisualizar(id:number){
    this.instituicaoService.instituicaoVisualizar(id).subscribe({
      next: (res) => { 
        this.instituicao = res
      },
      error: (err) => {
        this.msg_dialogo("Erro", "Erro ao Visualizar!")
      }
    });
  }

  public instituicaoDelete(id: number){
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
         this.instituicaoService.instituicaoDelete(id).subscribe({
          next: (res) => {
            this.loadInstituicao();
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
