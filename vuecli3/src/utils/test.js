import {
  xhr
} from './module'

function processConfig(config) {
  if (config) {
    config.a = 99
  }
}

export function pTest(config) {
  processConfig(config)
  return xhr(config).then(res => transform(res))
}

export function pTest2(config) {
  processConfig(config)
  return xhr(config).then(res => transform(res))
}

function transform(res) {
  res.status = res.status + '--YY' + Math.random()
  return res
}