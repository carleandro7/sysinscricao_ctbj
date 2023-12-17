import { NgFor } from '@angular/common';
import { Component, AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, NgForm, Validators  } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InstituicaoModel } from 'src/app/module/instituicao-model';
import { InstituicaoService } from 'src/app/services/instituicao.service';

@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.scss']
})
export class InstituicaoComponent implements OnInit, AfterViewInit {
  public instituicao:any = {};
  public instituicaos: Array<InstituicaoModel> = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public displayedColumns = ['id', 'nome'];
  public dataSource = new MatTableDataSource<InstituicaoModel>();

  public cursor = 0;

  public pageSize = 4; // Número de produtos por página
  public currentPage = 1;
  public totalPages = 0
  public pages_i: number[]| any
  public currentProductIndex: number = 0;


  constructor(private formBuilder: FormBuilder, private instituicaoService: InstituicaoService){}

  ngOnInit(): void{
    this.loadInstituicao();

  }

  public loadInstituicao(): void {
    this.instituicaoService.getInsituicao(this.currentPage, this.pageSize)
      .subscribe({
        next: (res) => {
          console.log(res[1])
          this.instituicaos =  res[0]
          this.totalPages =   Math.ceil(res[1]/this.pageSize);
          this.pages_i = this.calculateDisplayedPages();
          if (this.instituicaos.length > 0) {
            this.currentProductIndex = 0;
          }
        },
        error: (err) => console.log(err)
    });
  }

  public onPageChange(page: number): void {
    this.currentPage = page;
    this.loadInstituicao();
  }

  public get pages(): number[] {
    // Adicione lógica para calcular o número total de páginas
    // com base na resposta do backend ou em uma variável separada
    //const totalPages = 10; // Substitua pelo valor real
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  ngAfterViewInit(): void {
   
    this.dataSource.data = this.instituicaos;
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource)
    
  }


  public instituicaoAll?(){
    this.instituicaoService.instituicaoList().subscribe({
      next: (res) => this.instituicaos =  res,
      error: (err) => console.log(err)
  });
  }

  public submitForm(form: NgForm){
    console.log(form.value)
    if(!form.value.id){
      this.instituicaoService.instituicaoAdd(form.value.nome).subscribe({
        next: (res) => {
          this.loadInstituicao()
          form.reset()
        },
        error: (err) => console.log(err)
      });
    }else{
      this.instituicaoEdit(form.value.id, form.value.nome, form)
    }
  }

  public instituicaoEdit(id:number, value:string, form: NgForm){
    this.instituicaoService.instituicaoEdit(id, value).subscribe({
      next: (res) => { 
        this.loadInstituicao()
        form.reset()
      },
      error: (err) => {
        console.log(err);
        window.alert("Erro ao alterar")
      }
    });
  }

  calculateDisplayedPages(): number[] {
    const MAX_DISPLAYED_PAGES = 6; // Máximo de páginas exibidas

    if (this.totalPages <= MAX_DISPLAYED_PAGES) {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    } else {
      const firstPages = Array.from({ length: 3 }, (_, index) => index + 1);
      const lastPages = Array.from({ length: 3 }, (_, index) => this.totalPages - 2 + index);
      return [...firstPages, -1, ...lastPages];
    }
  }

  // Função para navegar para uma página específica
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadInstituicao();
    }
  }

  // Função para navegar para a próxima página
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadInstituicao();
    }
  }

  // Função para navegar para a página anterior
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadInstituicao();
    }
  }

  // Função para navegar para a primeira página
  firstPage(): void {
    this.goToPage(1);
  }

  // Função para navegar para a última página
  lastPage(): void {
    this.goToPage(this.totalPages);
  }

  // Função para navegar para o primeiro produto
  firstProduct(): void {
    console.log(`${this.currentProductIndex}`);
    if (this.instituicaos.length > 0) {
      this.currentProductIndex = 0;
    }
  }

  // Função para navegar para o produto anterior
  prevProduct(): void {
    console.log(`${this.currentProductIndex}`);
    if (this.currentProductIndex > 0) {
      this.currentProductIndex--;
    }
  }

  // Função para navegar para o próximo produto
  nextProduct(): void {
    console.log(`${this.currentProductIndex}`);
    if (this.currentProductIndex < this.instituicaos.length - 1) {
      this.currentProductIndex++;
    }
  }

  // Função para navegar para o último produto
  lastProduct(): void {
    console.log(`${this.currentProductIndex}`);
    if (this.instituicaos.length > 0) {
      this.currentProductIndex = this.instituicaos.length - 1;
    }
  }


  

  public instituicaoViu(id:number){
    this.instituicaoService.instituicaoVisualizar(id).subscribe({
      next: (res) => { 
        this.instituicao = res
        console.log(this.instituicao.nome)
      },
      error: (err) => {
        console.log(err);
        window.alert("Erro ao alterar")
      }
    });
  }

  public instituicaoDelete(id: number){
   return this.instituicaoService.instituicaoDelete(id).subscribe({
    next: (res) => {
      this.loadInstituicao()
      },
      error: (err) => console.log(err)
   })
  }
}
