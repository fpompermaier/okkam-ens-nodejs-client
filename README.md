Okkam ENS command line client
========

This node-js client allow to query the Okkam ENS via command line

Pre-requisites
========

-------------------------------------------------------------------
sudo apt-get install nodejs
sudo apt-get install npm
sudo npm install optimist
-------------------------------------------------------------------

To get the Okkam IDs of an entity you can run the following commands:


examples
========

Get help
-------------------------------------------------------------------

	./ens


Simplest query, with defaults (type->any and matching-module->fbem).
Shows only okkam ids.
-------------------------------------------------------------------

	./ens --name "Paolo Bouquet"


Query that specify type and matching module.
Shows only okkam ids.
-------------------------------------------------------------------

	./ens --type person --name "Paolo Bouquet" --matching-module fbem
	
This query is verbose (-v). Show all attributes
-------------------------------------------------------------------

	./ens -v --type person --name "Paolo Bouquet" --matching-module fbem
