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

# Simplest query, by keywords with defaults

Shows only okkam ids (type->any and matching-module->fbem)

	./ens --query "Paolo Bouquet"

# Query by keywords with specific type and matching module

Shows only okkam ids.

	./ens --type person --query "Paolo Bouquet" --matching-module fbem

# Query by attributes

Shows only okkam ids. Remember to escape double quotes with '\' character!

	./ens --type person --query "first_name=\"Paolo\" last_name=\"Bouquet\" " --matching-module fbem
	
# Verbose mode (-v)

Show all attributes

	./ens -v --type person --query "Paolo Bouquet" --matching-module fbem
