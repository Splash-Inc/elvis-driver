BIN = ./node_modules/.bin
DIST = ./browser
SRC = ./lib

JS_INPUT = $(SRC)/index.js
JS_OUTPUT = $(DIST)/index.js

all: clean browserify
	@make finish_message type=browserify

clean:
	@echo Cleaning $(DIST) folder
	@rm -rf $(DIST)
	@mkdir $(DIST)

watch:
	@echo Watching scripts...
	@$(BIN)/watchify \
		--transform babelify \
		--verbose \
		--standalone Elvis \
		--delay=100 \
		--debug \
		$(JS_INPUT) -o $(JS_OUTPUT)

browserify:
	@echo Browserifying...
	@$(BIN)/browserify \
		--transform babelify \
		--standalone Elvis \
		--debug \
		$(JS_INPUT) --outfile $(JS_OUTPUT)

release:
	@npm test && \
		npm version $(ver) && \
		git push && \
		git push origin --tags && \
		npm publish && \
		make finish_message type=release

min:
	@echo Minifying...
	@$(BIN)/uglifyjs $(JS_OUTPUT) -mc -o $(JS_OUTPUT)

docs:
	@$(BIN)/jsdox ./lib/public
	@cat ./readme.md ./output/*.md > __readme.md
	@rm -rf ./output
	@node -e "\
		var fs = require('fs');\
		fs.writeFileSync('readme.md', (() => (\
			fs.readFileSync('__readme.md')\
				.toString()\
				.replace(/# global(\s+)/gi, '')\
				.replace(/\* \* \*\s+\*/gi, '*')\
		))())\
	"
	@rm ./__readme.md
	@make finish_message type=documentation

finish_message:
	@echo Finished $(type). `date`
	@echo '====='