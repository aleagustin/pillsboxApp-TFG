import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfomedicinePage } from './infomedicine.page';

describe('InfomedicinePage', () => {
  let component: InfomedicinePage;
  let fixture: ComponentFixture<InfomedicinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfomedicinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfomedicinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
