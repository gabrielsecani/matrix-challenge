import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadradoComponent } from './quadrado.component';

describe('QuadradoComponent', () => {
  let component: QuadradoComponent;
  let fixture: ComponentFixture<QuadradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuadradoComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(QuadradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Entrada');
  });

  it('teste unitário 1,2,3,4,5,6,7,8,9', async () => {
    component.entrada.nativeElement.value = "1,2,3,4,5,6,7,8,9";
    component.novo();
    // let button = fixture.debugElement.nativeElement.querySelector('button');
    // button.click();
    expect(component.texto).toContain('4,1,2,7,5,3,8,9,6');
  });

  it('teste unitário 4,2,9,1 ', async () => {
    component.entrada.nativeElement.value = "4,2,9,1";
    component.novo();
    // let button = fixture.debugElement.nativeElement.querySelector('button');
    // button.click();
    expect(component.texto).toContain('9,4,1,2');
  });

  it('teste unitário -9 ', async () => {
    component.entrada.nativeElement.value = "-9";
    component.novo();
    // let button = fixture.debugElement.nativeElement.querySelector('button');
    // button.click();
    expect(component.texto).toContain('-9');
  });

  it('teste unitário invalido 1 ', async () => {
    component.entrada.nativeElement.value = "2,3";
    expect(component.novo()).toBeFalsy();
    // let button = fixture.debugElement.nativeElement.querySelector('button');
    // button.click();
    expect(component.texto).toContain('[]');
  });

  it('teste unitário invalido 2', async () => {
    component.entrada.nativeElement.value = "3,-5,-2";
    expect(component.novo()).toBeFalsy();
    // let button = fixture.debugElement.nativeElement.querySelector('button');
    // button.click();
    expect(component.texto).toContain('[]');
  });

  it('teste unitário invalido 3', async () => {
    component.entrada.nativeElement.value = "1,1,2,1,1";
    expect(component.novo()).toBeFalsy();
    // let button = fixture.debugElement.nativeElement.querySelector('button');
    // button.click();
    expect(component.texto).toContain('[]');
  });

});
