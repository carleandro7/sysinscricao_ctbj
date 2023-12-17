import { Component,ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent {
  badgevisible = true;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  private mediaQuery: MediaQueryList;

  constructor(private builder:FormBuilder, private changeDetectorRef: ChangeDetectorRef, private mediaMatcher: MediaMatcher) {
    this.mediaQuery = this.mediaMatcher.matchMedia('(max-width: 700px)');
    this.mediaQuery.addEventListener('change', this.handleScreenSizeChange.bind(this));
  }

  handleScreenSizeChange(event: MediaQueryListEvent): void {
    const isSmallScreen = event.matches;

    // Se a largura da tela for menor que 700px, feche o mat-sidenav
    if (isSmallScreen) {
      this.sidenav.close();
    }else{
      this.sidenav.open();
    }

    // Atualize o estado do Angular para garantir a detecção de alterações
    this.changeDetectorRef.detectChanges();
  }
  
  badgevisibility() {
    this.badgevisible = false;
  }
}
