import chai from 'chai';
import sinonChai from 'sinon-chai';
import Observable from 'zen-observable';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>');

global.Observable = Observable;
global.window = dom.window;
global.document = dom.window.document;

chai.use(sinonChai);
