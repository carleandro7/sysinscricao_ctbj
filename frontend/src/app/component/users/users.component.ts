


import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Componentpai } from '../componentpai';
import { MatPaginator } from '@angular/material/paginator';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { InstituicaoModel } from 'src/app/module/instituicao-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends Componentpai implements OnInit, AfterViewInit {
  
  @ViewChild(MatPaginator) override paginator!: MatPaginator;
  public instituicoes: InstituicaoModel | any;
  public override displayedColumns = ['id', 'nome', 'email', 'telefone', 'status', 'instituicaoId', 'actions'];
  public emModoNovoCadastro: boolean = true;
  public opcoesStatus: { valor: number, descricao: string }[] = [
    { valor: 1, descricao: 'Ativo' },
    { valor: 0, descricao: 'Inativo' },
  ];

  public obterDescricaoStatus(valorStatus: number): string {
    const opcao = this.opcoesStatus.find(op => op.valor === valorStatus);
    return opcao ? opcao.descricao : '';
  }

  constructor(protected override fb: FormBuilder, protected override dialog: MatDialog, protected override appService: UserService,
    private instituicaoService: InstituicaoService){
    super(fb, dialog);
    this.formCadastro = this.fb.group({
      // Defina os campos do seu formulário aqui
      id: [''],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      senha: [''],
      status: ['', [Validators.required]],
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

  override preencherFormulario(user: any): void {
    this.formCadastro.patchValue({
      id: user.id,
      nome: user.nome,
      email: user.email,
      telefone: user.telefone,
      status: user.status,
      instituicaoId: user.instituicaoId,
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
