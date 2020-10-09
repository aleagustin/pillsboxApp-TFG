import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PillsboxindexPage } from './pillsboxindex.page';

describe('PillsboxindexPage', () => {
  let component: PillsboxindexPage;
  let fixture: ComponentFixture<PillsboxindexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PillsboxindexPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PillsboxindexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
