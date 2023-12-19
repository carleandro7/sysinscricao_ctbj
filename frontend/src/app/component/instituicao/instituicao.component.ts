import { Component, AfterViewInit, OnInit, ViewChild} from '@angular/core';
import {  FormBuilder, Validators,  } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { InstituicaoModel } from 'src/app/module/instituicao-model';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { MatDialog } from '@angular/material/dialog';
import { Componentpai } from '../componentpai';

@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.scss'],
})
export class InstituicaoComponent extends Componentpai implements OnInit, AfterViewInit {
  
  @ViewChild(MatPaginator) override paginator!: MatPaginator;
  public instituicoes: InstituicaoModel | any;
  public override displayedColumns = ['id', 'nome', 'actions'];

  constructor(protected override fb: FormBuilder, protected override dialog: MatDialog, protected override appService: InstituicaoService){
    super(fb, dialog);
    this.formCadastro = this.fb.group({
      // Defina os campos do seu formulário aqui
      id: [''],
      nome: ['', [Validators.required]],
    
    });
    
  }

   ngOnInit(): void{
    this.loadapp();
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


}