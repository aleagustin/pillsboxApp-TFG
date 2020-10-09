import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PillsboxcontentPage } from './pillsboxcontent.page';

describe('PillsboxcontentPage', () => {
  let component: PillsboxcontentPage;
  let fixture: ComponentFixture<PillsboxcontentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PillsboxcontentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PillsboxcontentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
