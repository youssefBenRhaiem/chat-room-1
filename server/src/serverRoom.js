class ServerRoom {
  constructor({ id, name, password = "" }) {
    this.id = id;
    this.name = name;
    this.clients = 0;
    this.msg = [];
    this.password = password;
    this.privacy = password ? "Private" : "Public";
  }

  join() {
    this.clients++;
  }
  disconnect() {
    this.clients = Math.max(0, this.clients - 1);
  }
  setMsg(user, msg) {
    this.msg = [...this.msg, { user, msg }];
  }
  getMsg() {
    return this.msg;
  }
  clientViewData() {
    return {
      id: this.id,
      name: this.name,
      privacy: this.privacy,
      clients: this.clients,
    };
  }
}
module.exports = { ServerRoom };
