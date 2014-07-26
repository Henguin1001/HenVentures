module.exports = function(nano) {
	return function(database, object_name) {
		var object = function() {
			this.object_name = object_name;
			this.type = object_name;
			this.db = nano.use(database);
		};
		object.prototype.getById = function(id, callback) {
			this.db.get(id, {
				revs_info: false
			}, callback);
		};
		object.prototype.listByView = function(view, callback) {
			this.db.view(this.object_name, view, {}, callback);
		};
		object.prototype.listByView_paging = function(view, page_number, settings, callback) {
			var limit = settings.limit || 10;
			this.listByView(view, function(err, body) {
				var pageStart = page_number * limit;

				body.wasLimited = true;
				if (body.rows.length < limit) body.wasLimited = false;

				body.total = Math.ceil(body.rows.length / limit);
				body.rows = body.rows.slice(pageStart, pageStart + limit);
				callback(err, body);
			});
		};
		object.prototype.getByIds = function(ids, callback) {
			this.db.fetch({
				keys: ids
			}, function(err, body) {
				if (!err) {
					body = body.rows.map(function(row){
						return row.doc;
					});
					callback(undefined, body);
				} else {
					callback(err);
				}
			});
		};
		return object;
	};
};