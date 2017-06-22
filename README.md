# Chef Server
Whether you have five or five thousand servers, Chef lets you manage them all by turning infrastructure into code. Infrastructure described as code is flexible, versionable, human-readable, and testable. This guide instructs you how to implement an integration between xMatters and Chef Server at the Recipe level.

# Pre-Requisites
* Chef Recipe or Chef custom Event Handler.  See the following Chef documentation for instructions on how to configure a custom Event Handler.  [Chef Event Handler Help Docs](https://docs.chef.io/handlers.html)  
* xMatters account - If you don't have one, [get one](https://www.xmatters.com)!
* xMatters ChefServer Communication Plan (see zip file in above files) imported into xMatters or created in xMatters.

# Files
* [Chef-Server_IB.js](Chef-Server_IB.js) - The javascript file to be pasted into a Inbound Integration Builder. It takes the payload from Chef and formats the content to match the xMatters Form requirements and creates an xMatters Event. 
* [ChefServer.zip](ChefServer.zip) - The comm plan (if needed) that has all the cool scripts and email format and such. 

# Installation

## Chef Recipe or Chef Custom Event Handler
1. Edit the default Recipe of the cookbook/cookbooks or the Custom Event Handler cookbook and add the following Ruby code:
```
if File::exists?('/tmp')
	puts "Error"
	http_request 'posting data' do
 		action :post
		url 'https://[xmatters instance]/api/integration/1/functions/7ae4d0e1-10bd-4c63-bf60-9a862a0abf18/triggers'
 		# message ({:some => 'data'}.to_json)
 		message ({:host => node['hostname'], :ip => node['ipaddress'], :cookbook => 'learn_chef_apache2', :status => 'Error with tmp file'}.to_json)
		headers('Content-Type' => 'application/json')
	end
	file '/tmp'
else
	puts "..."
end
```
* If the code is executed in a Recipe, access to run variables is limited to the following Automatic (Ohai) attributes. [Chef Cookbook/Recipe Automatic Attributes](https://docs.chef.io/attributes.html)  
* If a custom Event Handler is used, the run variables can be extended.  See Chef documentation on custom Event Handlers. [Chef Event Handler Help Docs](https://docs.chef.io/handlers.html)
* Additional methods to access additional Attributes outside of an Event Handler probably exist.  My novice experience on Chef led me to the above.
* When dynamic information is sent through via the message value, these values can effect how xMatters processes the information.  For example, depending on the cookbook that executes the above code, different groups could be targeted.  This allows customers to contact different groups/teams depending on the infrastructure layer that failed. 


## xMatters set up
1. Import the Communication Plan (see files).  If this step is done you can skip steps 2.
2. Create (In|Out)bound integration and add the code from the ChefServer.js file.
3. Configure the xMatters Endpoints. [xMatters Endpoints](https://help.xmatters.com/OnDemand/xmodwelcome/integrationbuilder/configure-endpoints.htm)
4. Create a chef group in xMatters and add your self to the group. [xMatters Groups](https://help.xmatters.com/OnDemand/groups/groups.htm).  The name of the chef group can be changed in the Inbound IB script.
  
# Testing
1. Run a Cookbook in Chef that will force the run to fail.
2. A message should come through on your devices.  Which ever devices you have configured in xMatters.
<kbd>
<img src="media/Picture1.png">
</kbd>

# Troubleshooting
View xMatters Activity Stream to determine issues with Chef payload or connectivity.


