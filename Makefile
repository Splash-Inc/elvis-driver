BIN = ./node_modules/.bin
DIST = ./dist
SRC = ./src

JS_INPUT = $(SRC)/index.js
JS_OUTPUT = $(DIST)/index.js

all: clean build
	@make finish_message type=build

clean:
	@echo Cleaning $(DIST) folder
	@rm -rf $(DIST)
	@mkdir $(DIST)

watch:
	@echo Watching scripts...
	@$(BIN)/watchify \
		--verbose \
		--standalone Elvis \
		--delay=100 \
		--debug \
		$(JS_INPUT) -o $(JS_OUTPUT)

build:
	@echo Building scripts...
	@$(BIN)/browserify \
		--standalone Elvis \
		--debug \
		$(JS_INPUT) --outfile $(JS_OUTPUT)

release: all min
	@make finish_message type=release

min:
	@echo Minifying scripts...
	@$(BIN)/uglifyjs $(JS_OUTPUT) -o $(JS_OUTPUT)

finish_message:
	@echo Finished $(type). `date`
	@echo '====='