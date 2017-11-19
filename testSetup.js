import chai from 'chai'
import sinonChai from 'sinon-chai'
import Observable from 'zen-observable'

global.Observable = Observable

chai.use(sinonChai)
