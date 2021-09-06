/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('products', {
    id: 'id',
    category : { type: 'varchar(1000)', notNull: true },
    productName : { type: 'varchar(1000)', notNull: true },
  })

  pgm.createTable('customers', {
    id: 'id',
    name: { type: 'varchar(1000)', notNull: true },
    email: { type: 'varchar(1000)', notNull: true },
  })

  pgm.createTable('devices', {
    id: 'id',
    customerId: {
      type: 'integer',
      notNull: true,
      references: '"customers"',
      onDelete: 'cascade',
    },
    //category : { type: 'varchar(1000)', notNull: true },
    //productName : { type: 'varchar(1000)', notNull: true },
    productId: {
      type: 'integer',
      notNull: true,
      references: '"products"',
      onDelete: 'cascade',
    },
    deviceName : { type: 'varchar(1000)' },
  })

  pgm.createTable("active_codes", {
    id: 'id',
    deviceId: {
      type: 'integer',
      notNull: true,
      references: '"devices"',
      onDelete: 'cascade',
    },
    name : { type: 'varchar(1000)', notNull: true },
    code : { type: 'varchar(4)', notNull: true },
    alwaysActive : { type: 'bool', notNull: true },
    activeHoursBegin : { type: 'time with time zone' },
    activeHoursEnd : { type: 'time with time zone' },
    startsAt : { type: 'timestamp with time zone' },
    endsAt : { type: 'timestamp with time zone' },
  })

  pgm.createIndex('devices', 'customerId')
  pgm.createIndex('devices', 'productId')
  pgm.createIndex('active_codes', 'deviceId')
}
