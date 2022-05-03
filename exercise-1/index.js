(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadTemplate = exports.loadData = void 0;
const initialContext = {
  isLoading: true,
  users: []
};

const loadTemplate = context => {
  const source = document.getElementById("entry-template").innerHTML;
  const template = Handlebars.compile(source);
  const html = template(context);
  document.getElementById("root").innerHTML += html;
};

exports.loadTemplate = loadTemplate;

const loadData = async () => {
  const response = await fetch('https://615485ee2473940017efaed3.mockapi.io/assessment');
  const users = await response.json();
  console.log(users);
  loadTemplate({
    isLoading: false,
    users
  });
};

exports.loadData = loadData;
loadTemplate(initialContext);
loadData();

},{}]},{},[1]);
