import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Componentpai } from '../componentpai';
import { MatPaginator } from '@angular/material/paginator';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { AppService } from 'src/app/services/app.service';
import { InstituicaoModel } from 'src/app/module/instituicao-model';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent extends Componentpai implements OnInit, AfterViewInit {
  
  @ViewChild(MatPaginator) override paginator!: MatPaginator;
  public instituicoes: InstituicaoModel | any;
  public override displayedColumns = ['id', 'nome', 'instituicaoId', 'actions'];

  constructor(protected override fb: FormBuilder, protected override dialog: MatDialog, protected override appService: CursoService,
     private instituicaoService: InstituicaoService){
    super(fb, dialog);
    this.formCadastro = this.fb.group({
      // Defina os campos do seu formulário aqui
      id: [''],
      nome: ['', [Validators.required]],
      instituicaoId: ['', [Validators.required]],
      // Adicione outros campos conforme necessário
    });
    
  }

   ngOnInit(): void{
    this.loadapp();
    this.carregarInstituicoes();
  }

   ngAfterViewInit(): void {
    this.size_page = this.paginator.pageSize;
  }

  override preencherFormulario(curso: any): void {
    this.formCadastro.patchValue({
      id: curso.id,
      nome: curso.nome,
      instituicaoId: curso.instituicaoId,
    });
  }

  carregarInstituicoes(): void {
    this.instituicaoService.objectList().subscribe({
      next: (res) => {
        this.instituicoes =  res[0];
        console.log(this.instituicoes)
      },
      error: (err) => console.log(err)
  });
  }

}
