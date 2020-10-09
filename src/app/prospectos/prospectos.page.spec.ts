import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProspectosPage } from './prospectos.page';

describe('ProspectosPage', () => {
  let component: ProspectosPage;
  let fixture: ComponentFixture<ProspectosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProspectosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
