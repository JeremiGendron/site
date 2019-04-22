# CNAPP_GETSTATUS
Very simple funciton, responds to a GET request and is hidden behind APIGateway.
Returns the value held by the status key in the CNAPP_STATUS DynamoDB table.
Used in the frontend, which shows a different status color in the ChatBar based
on the status code received from invoking this function.

# CNAPP_SETSTATUS
Very simple function, takes a JSON object as the event (sent from private app)
and writes it to CNAPP_STATUS DynamoDB table for querying by CNAPP_GETSTATUS.

# CNAPP_POSTCHATMESSAGE
Double-sided function, used to both post a chat message to me and mark messages
received from me as read (deleted from DynamoDB CNAPP_MESSAGES table).

# CNAPP_GETCHATMESSAGES
Simple function, looks for a user email in the path and returns a list of new
messages to the caller. Partially insecure, originally was making use of a 
very crafty token, but decided that it would be simpler to rely on the user's
email only.

NOTE: The messages sent from the user and by me can only be consumed once
before they are deleted, and only localStorage keeps a record of the exchange.

# CNAPP_CURRENTSTREAM
Simply reads a record containing details about the current stream's uuid in the
jeremigendron-metadata table and returns it to the caller. Useful to know which
path should be queried for the HLS manifest which supplies segment info to the
HLS.js player on the frontend.

# CNAPP_NEWCHATTOKEN
Creates a record in the CNAPP_USERS DynamoDB table, so that the user has a 
location to query for new messages. A user cannot post or receive messages
without first going through this "registration" process.

# CNAPP_REPLYCHATMESSAGE
Function used by myself with the private app, functions almost exactly like
CNAPP_POSTCHATMESSAGE including the double-sided utility. The only major 
difference is the inversion of which table is used to write messages and which
to delete the read ones from. Also, this one is only invoked directly from the
private app and cannot be queried through a standard URL.

# CNAPP_GETCHATREPLIES
Again, this is a counterpart to CNAPP_GETCHATMESSAGES, only with differences
in how it is invoked, which tables are in play and other minor differences.

# CNAPP_SENDEMAIL
Sends me an email when someone completes the contact form on the frontend with 
the provided name, company, message and email address.
