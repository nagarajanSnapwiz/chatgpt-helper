'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zodToJsonSchema = require('zod-to-json-schema');
var zod = require('zod');

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var _excluded = ["$schema", "additionalProperties"],
  _excluded2 = ["api", "prompt", "tools", "model", "messages"],
  _excluded3 = ["api", "schema", "prompt", "metadataDescription"],
  _excluded4 = ["model"];
function getParameterFromZod(schema) {
  var _zodToJsonSchema = zodToJsonSchema.zodToJsonSchema(schema),
    jsonSchema = _objectWithoutPropertiesLoose(_zodToJsonSchema, _excluded);
  return jsonSchema;
}
function createExtractor(_ref) {
  var description = _ref.purpose,
    schema = _ref.schema;
  var parameters = getParameterFromZod(schema);
  return {
    name: 'metadata_extract',
    description: description,
    parameters: parameters
  };
}
var Tools = /*#__PURE__*/function () {
  function Tools() {
    this.tools = void 0;
    this.functions = void 0;
    this.tools = [];
    this.functions = {};
  }
  var _proto = Tools.prototype;
  _proto.addTool = function addTool(_ref2) {
    var name = _ref2.name,
      description = _ref2.purpose,
      _ref2$argSchema = _ref2.argSchema,
      schema = _ref2$argSchema === void 0 ? zod.z.object({}) : _ref2$argSchema,
      implementation = _ref2.implementation;
    this.functions[name] = implementation;
    var parameters = getParameterFromZod(schema);
    this.tools.push({
      name: name,
      description: description,
      parameters: parameters
    });
    return this;
  };
  return Tools;
}();
var DEFAULT_MODEL = 'gpt-3.5-turbo-0613';
function runWithToolsUntilComplete(_x) {
  return _runWithToolsUntilComplete.apply(this, arguments);
}
function _runWithToolsUntilComplete() {
  _runWithToolsUntilComplete = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref3) {
    var api, prompt, tools, _ref3$model, model, _ref3$messages, messages, opts, complete, lastMessage, _chatCompletion$data$2, chatCompletion, _chatCompletion$data$, message, _message$function_cal, functionName, _message$function_cal2, _args, functionArgument, functionResult;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          api = _ref3.api, prompt = _ref3.prompt, tools = _ref3.tools, _ref3$model = _ref3.model, model = _ref3$model === void 0 ? DEFAULT_MODEL : _ref3$model, _ref3$messages = _ref3.messages, messages = _ref3$messages === void 0 ? [] : _ref3$messages, opts = _objectWithoutPropertiesLoose(_ref3, _excluded2);
          complete = false;
          messages = [].concat(messages, [{
            role: 'user',
            content: prompt
          }]);
          lastMessage = undefined;
        case 4:
          if (complete) {
            _context.next = 27;
            break;
          }
          _context.next = 7;
          return api.createChatCompletion(_extends({
            model: model,
            messages: messages,
            functions: tools.tools,
            function_call: 'auto'
          }, opts));
        case 7:
          chatCompletion = _context.sent;
          _chatCompletion$data$ = (_chatCompletion$data$2 = chatCompletion.data.choices) == null ? void 0 : _chatCompletion$data$2[0], message = _chatCompletion$data$.message;
          lastMessage = message;
          if (!message) {
            _context.next = 24;
            break;
          }
          messages = [].concat(messages, [message]);
          if (!message.function_call) {
            _context.next = 21;
            break;
          }
          _message$function_cal = message.function_call, functionName = _message$function_cal.name, _message$function_cal2 = _message$function_cal.arguments, _args = _message$function_cal2 === void 0 ? '{}' : _message$function_cal2;
          functionArgument = JSON.parse(_args);
          _context.next = 17;
          return tools.functions[functionName](functionArgument);
        case 17:
          functionResult = _context.sent;
          messages = [].concat(messages, [{
            role: 'function',
            name: functionName,
            content: JSON.stringify(functionResult)
          }]);
          _context.next = 22;
          break;
        case 21:
          complete = true;
        case 22:
          _context.next = 25;
          break;
        case 24:
          throw new Error('MessageResponseEmpty');
        case 25:
          _context.next = 4;
          break;
        case 27:
          return _context.abrupt("return", {
            messages: messages,
            lastMessage: lastMessage
          });
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _runWithToolsUntilComplete.apply(this, arguments);
}
function extractDataWithPrompt(_x2) {
  return _extractDataWithPrompt.apply(this, arguments);
}
function _extractDataWithPrompt() {
  _extractDataWithPrompt = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref4) {
    var _chatCompletion$data, _chatCompletion$data$3, _chatCompletion$data$4, _chatCompletion$data$5;
    var api, schema, content, _ref4$metadataDescrip, purpose, opts, fn, _opts$model, model, otherOpts, chatCompletion, _chatCompletion$data$7, _chatCompletion$data$6, message;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          api = _ref4.api, schema = _ref4.schema, content = _ref4.prompt, _ref4$metadataDescrip = _ref4.metadataDescription, purpose = _ref4$metadataDescrip === void 0 ? '' : _ref4$metadataDescrip, opts = _objectWithoutPropertiesLoose(_ref4, _excluded3);
          fn = createExtractor({
            purpose: purpose,
            schema: schema
          });
          _opts$model = opts.model, model = _opts$model === void 0 ? DEFAULT_MODEL : _opts$model, otherOpts = _objectWithoutPropertiesLoose(opts, _excluded4);
          _context2.next = 5;
          return api.createChatCompletion(_extends({
            model: model,
            messages: [{
              role: 'user',
              content: content
            }],
            functions: [fn],
            function_call: {
              name: fn.name
            }
          }, otherOpts));
        case 5:
          chatCompletion = _context2.sent;
          if (!((_chatCompletion$data = chatCompletion.data) != null && (_chatCompletion$data$3 = _chatCompletion$data.choices) != null && (_chatCompletion$data$4 = _chatCompletion$data$3[0]) != null && (_chatCompletion$data$5 = _chatCompletion$data$4.message) != null && _chatCompletion$data$5.function_call)) {
            _context2.next = 11;
            break;
          }
          _chatCompletion$data$6 = (_chatCompletion$data$7 = chatCompletion.data.choices) == null ? void 0 : _chatCompletion$data$7[0], message = _chatCompletion$data$6.message;
          return _context2.abrupt("return", {
            data: message.function_call.arguments,
            message: message
          });
        case 11:
          throw new Error('ResultEmpty');
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _extractDataWithPrompt.apply(this, arguments);
}

exports.Tools = Tools;
exports.extractDataWithPrompt = extractDataWithPrompt;
exports.runWithToolsUntilComplete = runWithToolsUntilComplete;
//# sourceMappingURL=chatgpt-helper.cjs.development.js.map
