# Chef Server
Whether you have five or five thousand servers, Chef lets you manage them all by turning infrastructure into code. Infrastructure described as code is flexible, versionable, human-readable, and testable. Check out the sweet video [here](media/mysweetvideo.mov). 

# Pre-Requisites
* Chef Recipe or Chef custom Event Handler.  The   See the following Chef documentation for instructions on how to configure a custom Event Handler.  [Chef Event Handler Help Docs](https://docs.chef.io/handlers.html)  
* xMatters account - If you don't have one, [get one](https://www.xmatters.com)!
* xMatters ChefServer Communication Plan (see zip file in above files) imported into xMatters or created in xMatters.

# Files
* [ChefServer_IB.js](ChefServer_IB.js) - The javascript file to be pasted into a Inbound Integration Builder. It takes the payload from Chef and formats the content to match the xMatters Form requirements and creates an xMatters Event. 
* [ChefServer.zip](ChefServer.zip) - The comm plan (if needed) that has all the cool scripts and email format and such. 

# Installation
Details of the installation go here. 

## Chef Recipe or Chef Custom Event Handler
1. Edit the default Recipe of the cookbook/cookbooks or the Custom Event Handler cookbook and add the following Ruby code:
* http_request 'posting data' do
* action :post
* url 'https://advisors.na5.xmatters.com/api/integration/1/functions/7ae4d0e1-10bd-4c63-bf60-9a862a0abf18/triggers'
* # message ({:some => 'data'}.to_json)
* message ({:host => node['hostname'], :ip => node['ipaddress'], :cookbook => node['cookbook']['name'], :status => run_status}.to_json)
* headers('Content-Type' => 'application/json')
* end
*
* If the code is executed in a Recipe, access to run variables is limited to the following standard environment variables.  If the an custom Event Handler is used, the run variables can be extended.  See Chef documentation on custom Event Handlers. [Chef Event Handler Help Docs](https://docs.chef.io/handlers.html)
2. The attached delivery.rb file is an example of the configured settings pointing to a xMatters instance.
3. The following are the ruby lines in the file:
      * notifier['enable']
      * notifier['user_webhook_url']
4. The following is a sample notification message body:
      * {
      *  "automate_fqdn":"automate.test",
      *  "failure_snippet":"Chef client run failure on [chef-server.test] centos-runner-1.test : https://failure_url \n Failure Reason\n",
      * "exception_backtrace":"A long string with the backtrace that contains the error and \n",
      *  "exception_title":"Error Resolving Cookbooks for Run List:",
      *  "exception_message":"412 \"Precondition Failed\"",
      *  "automate_failure_url":"automate.test/long/url/that-takes-you-to-run-failure-page",
      *  "timestamp_utc":"2017-06-19T19:58:35.000000Z",
      *  "start_time_utc":"2017-06-19T19:58:35.000000Z",
      *  "end_time_utc":"2017-06-19T19:58:35.000000Z",
      *  "node_name":"centos-runner-1.test",
      *  "type":"node_failure"
      *}
5. Restart the Chef Automate server after saving the delivery.rb file.



## xMatters set up
1. Import the Communication Plan (see files).  If this step is done you can skip steps 2.
2. Create (In|Out)bound integration and add the code from the Chef-Generic-Webhook_IB.js file.
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


