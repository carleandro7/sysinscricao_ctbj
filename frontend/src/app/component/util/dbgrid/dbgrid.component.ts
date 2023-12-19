import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dbgrid',
  template: `
  <div class="row nav-grid">
          <div class="col col-lg-12 text-center">
            <button type="button" (click)="novoCadastro()" class="btn btn-info btn_grid">Novo Cadastro</button>
            <button type="button" (click)="submitForm()" class="btn btn-success btn_grid">Salvar Cadastro</button>
            <button type="button" (click)="firstapp()" [disabled]="firstButton == 0" class="btn btn-primary btn_grid" >Primeiro Produto</button>
            <button type="button" (click)="prevapp()" [disabled]="prevButton == 0" class="btn btn-primary btn_grid" >Anterior Produto</button>
            <button type="button" (click)="nextapp()" [disabled]="nextButton == 0" class="btn btn-primary btn_grid" >Próximo Produto</button>
            <button type="button" (click)="lastapp()" [disabled]="lastButton == 0" class="btn btn-primary btn_grid" >Último Produto</button>
          </div>
    </div>
  `,
  styleUrls: ['./dbgrid.component.scss']
})
export class DbgridComponent {
  @Input() firstapp!: () => void;
  @Input() firstButton?: number;

  @Input() prevapp!: () => void;
  @Input() prevButton?: number;

  @Input() nextapp!: () => void;
  @Input() nextButton?: number;

  @Input() lastapp!: () => void;
  @Input() lastButton?: number;

  @Input() submitForm!: () => void;
  @Input() novoCadastro!: () => void;

 

}
