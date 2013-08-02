Okkam ENS command line client
========

This node-js client allow to query the Okkam ENS via command line

Pre-requisites
========

**Install node-js, npm and optimist module before:**

	sudo apt-get install nodejs	
	sudo apt-get install npm	
	sudo npm install optimist

Examples
========

# Get help

	./ens

# Simplest query, with defaults

Shows only okkam ids (type->any and matching-module->fbem)

	./ens --name "Paolo Bouquet"

# Specify type and matching module

Shows only okkam ids.

	./ens --type person --name "Paolo Bouquet" --matching-module fbem
	
# Verbose mode (-v)

Show all attributes

	./ens -v --type person --name "Paolo Bouquet" --matching-module fbem
