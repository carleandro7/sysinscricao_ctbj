import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Componentpai } from '../componentpai';
import { MatPaginator } from '@angular/material/paginator';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { InstituicaoModel } from 'src/app/module/instituicao-model';
import { ModuloService } from 'src/app/services/modulo.service';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss']
})
export class ModulosComponent extends Componentpai implements OnInit, AfterViewInit {
  
  @ViewChild(MatPaginator) override paginator!: MatPaginator;
  public instituicoes: InstituicaoModel | any;
  public override displayedColumns = ['id', 'nome', 'instituicaoId', 'actions'];

  constructor(protected override fb: FormBuilder, protected override dialog: MatDialog, protected override appService: ModuloService,
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

  override preencherFormulario(modulo: any): void {
    this.formCadastro.patchValue({
      id: modulo.id,
      nome: modulo.nome,
      instituicaoId: modulo.instituicaoId,
    });
  }

  carregarInstituicoes(): void {
    this.instituicaoService.objectList().subscribe({
      next: (res) => {
        this.instituicoes =  res[0];
      },
      error: (err) => console.log(err)
  });
  }

}