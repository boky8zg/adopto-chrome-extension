String.prototype.IsEmail = function () {
    if (this.match(/^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/)) {
        return true;
    }

    return false;
}

String.prototype.GetEmailUsername = function () {
    if (this.IsEmail()) {
        return this.split('@')[0];
    }

    return false;
}

String.prototype.GetEmailHost = function () {
    if (this.IsEmail()) {
        return this.split('@')[1];
    }

    return false;
}