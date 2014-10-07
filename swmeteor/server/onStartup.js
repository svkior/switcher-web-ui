/**
 * Created by svkior on 09/09/14.
 */
if(ServerRun.find().count() < 1){
    ServerRun.insert({
        conf: null
    });
}