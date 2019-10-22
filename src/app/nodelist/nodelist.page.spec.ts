import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodelistPage } from './nodelist.page';

describe('NodelistPage', () => {
  let component: NodelistPage;
  let fixture: ComponentFixture<NodelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodelistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
