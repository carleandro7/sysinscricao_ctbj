import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Componentpai } from '../componentpai';
import { MatPaginator } from '@angular/material/paginator';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { InstituicaoModel } from 'src/app/module/instituicao-model';
import { SelecaomodeloService } from 'src/app/services/selecaomodelo.service';

@Component({
  selector: 'app-selecaomodelos',
  templateUrl: './selecaomodelos.component.html',
  styleUrls: ['./selecaomodelos.component.scss']
})

export class SelecaomodelosComponent extends Componentpai implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) override paginator!: MatPaginator;
  public instituicoes: InstituicaoModel | any;
  public override displayedColumns = ['id', 'descricao', 'instituicaoId', 'actions'];
  public emModoNovoCadastro: boolean = true;


  constructor(protected override fb: FormBuilder, protected override dialog: MatDialog, protected override appService: SelecaomodeloService,
    private instituicaoService: InstituicaoService){
    super(fb, dialog);
    this.formCadastro = this.fb.group({
      // Defina os campos do seu formulário aqui
      id: [''],
      descricao: ['', [Validators.required]],
      inicio_inscricao: ['', [Validators.required]],
      fim_inscricao: ['', [Validators.required]],
      inicio_resultado: ['', [Validators.required]],
      fim_resultado: ['', [Validators.required]],
      inicio_recurso: ['', [Validators.required]],
      fim_recurso: ['', [Validators.required]],
      resultado_final: ['', [Validators.required]],
      texto_documentacao: ['', [Validators.required]],
      texto_final_pagina: ['', [Validators.required]],
      instituicaoId: ['', [Validators.required]],
      // Adicione outros campos conforme necessário
    });
     // Adiciona um ouvinte para alterações no campo ID
     this.formCadastro.get('id')?.valueChanges.subscribe(() => {
      this.validarSenhaComBaseNoId();
    });
    this.validarSenhaComBaseNoId();
  }

  private validarSenhaComBaseNoId(): void {
    const idCampo = this.formCadastro.get('id');
    const senhaCampo = this.formCadastro.get('senha');
    // Adiciona ou remove a validação "required" com base no valor inicial do campo ID
    if (idCampo?.value == '' || idCampo?.value == null) {
      senhaCampo?.setValidators([Validators.required]);
    } else {
      senhaCampo?.clearValidators();
    }
    // Atualiza o estado do campo de senha
    senhaCampo?.updateValueAndValidity();
  }
   ngOnInit(): void{
    this.loadapp();
    this.carregarInstituicoes();
  }

   ngAfterViewInit(): void {
    this.size_page = this.paginator.pageSize;
  }

  override preencherFormulario(selecaomodelo: any): void {
    this.formCadastro.patchValue({
      id: selecaomodelo.id,
      descricao: selecaomodelo.descricao,
      inicio_inscricao: selecaomodelo.inicio_inscricao,
      fim_inscricao: selecaomodelo.fim_inscricao,
      inicio_resultado: selecaomodelo.inicio_resultado,
      fim_resultado: selecaomodelo.fim_resultado,
      inicio_recurso: selecaomodelo.inicio_recurso,
      fim_recurso: selecaomodelo.fim_recurso,
      resultado_final: selecaomodelo.resultado_final,
      texto_documentacao: selecaomodelo.texto_documentacao,
      texto_final_pagina: selecaomodelo.texto_final_pagina,
      instituicaoId: selecaomodelo.instituicaoId,
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
