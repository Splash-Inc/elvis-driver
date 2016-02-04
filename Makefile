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

release: all min
	@npm test && \
		npm version $(ver) && \
		git push origin --tags && \
		npm publish && \
		make finish_message type=release

min:
	@echo Minifying...
	@$(BIN)/uglifyjs $(JS_OUTPUT) -o $(JS_OUTPUT)

finish_message:
	@echo Finished $(type). `date`
	@echo '====='