/**
 * @fileoverview gRPC-Web generated client stub for tracking
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.tracking = require('./tracking_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.tracking.TrackingClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.tracking.TrackingPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tracking.TrackingRequest,
 *   !proto.tracking.TrackingResponse>}
 */
const methodInfo_Tracking_track = new grpc.web.AbstractClientBase.MethodInfo(
  proto.tracking.TrackingResponse,
  /** @param {!proto.tracking.TrackingRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.tracking.TrackingResponse.deserializeBinary
);


/**
 * @param {!proto.tracking.TrackingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.tracking.TrackingResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tracking.TrackingResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tracking.TrackingClient.prototype.track =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tracking.Tracking/track',
      request,
      metadata || {},
      methodInfo_Tracking_track,
      callback);
};


/**
 * @param {!proto.tracking.TrackingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tracking.TrackingResponse>}
 *     A native promise that resolves to the response
 */
proto.tracking.TrackingPromiseClient.prototype.track =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tracking.Tracking/track',
      request,
      metadata || {},
      methodInfo_Tracking_track);
};


module.exports = proto.tracking;

