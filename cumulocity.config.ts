import { ConfigurationOptions } from '@c8y/devkit/dist/options';
import { version } from './package.json';

export default {
  runTime: {
    version,
    name: 'application',
    contextPath: 'application',
    key: 'application-application-key',
    dynamicOptionsUrl: '/apps/public/public-options/options.json'
  },
  buildTime: {
    federation: [
      '@angular/animations',
      '@angular/cdk',
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/forms',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router',
      '@c8y/client',
      '@c8y/ngx-components',
      'ngx-bootstrap',
      '@ngx-translate/core',
      '@ngx-formly/core'
    ]
  }
} as const satisfies ConfigurationOptions;
