BIN = ./node_modules/.bin
DIST = ./browser
SRC = ./lib

JS_INPUT = $(SRC)/index.js
JS_OUTPUT = $(DIST)/index.js

all: clean browserify min
	@make finish_message type=browserify

clean:
	@echo Cleaning $(DIST) folder
	@rm -rf $(DIST)
	@mkdir $(DIST)

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
	@$(BIN)/jsdoc -c .jsdoc.json --verbose
	@make finish_message type=documentation

finish_message:
	@echo Finished $(type). `date`
	@echo '====='