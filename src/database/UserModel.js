class UserModel {
    constructor(name, accessToken,company,id,image_link,serverId) {
        this.name = name;
        this.access_token = accessToken;
        this.company = company;
        this.id = id;
        this.image_link = image_link;
        this.serverId = serverId;
    }
}

module.exports = UserModel;