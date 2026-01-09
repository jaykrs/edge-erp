import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean &
      Attribute.Configurable &
      Attribute.DefaultTo<true>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    usertype: Attribute.String;
    otp: Attribute.BigInteger;
    phoneOtp: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAssesmentAssesment extends Schema.CollectionType {
  collectionName: 'assesments';
  info: {
    singularName: 'assesment';
    pluralName: 'assesments';
    displayName: 'assesment';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    assesment_title: Attribute.Text;
    assesment_description: Attribute.Text;
    assesment_marks: Attribute.Integer;
    author: Attribute.String;
    course: Attribute.String;
    passmarks: Attribute.Integer;
    assesment_attachment: Attribute.String;
    isactive: Attribute.Boolean & Attribute.DefaultTo<false>;
    instructor: Attribute.String;
    course_title: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::assesment.assesment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::assesment.assesment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAssesmentquestionAssesmentquestion
  extends Schema.CollectionType {
  collectionName: 'assesmentquestions';
  info: {
    singularName: 'assesmentquestion';
    pluralName: 'assesmentquestions';
    displayName: 'assesmentquestion';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    assesment_id: Attribute.Integer;
    question_type: Attribute.String;
    question_id: Attribute.Integer;
    courseid: Attribute.String;
    course_title: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::assesmentquestion.assesmentquestion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::assesmentquestion.assesmentquestion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAssesmentreportAssesmentreport
  extends Schema.CollectionType {
  collectionName: 'assesmentreports';
  info: {
    singularName: 'assesmentreport';
    pluralName: 'assesmentreports';
    displayName: 'assesmentreport';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    customerid: Attribute.String;
    assesment_id: Attribute.Integer;
    marks: Attribute.Integer;
    assesment_evalution_report: Attribute.JSON;
    fullMarks: Attribute.Integer;
    passMarks: Attribute.Integer;
    qsid: Attribute.String;
    courseid: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::assesmentreport.assesmentreport',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::assesmentreport.assesmentreport',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAssetAsset extends Schema.CollectionType {
  collectionName: 'assets';
  info: {
    singularName: 'asset';
    pluralName: 'assets';
    displayName: 'asset';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    filename: Attribute.String;
    author: Attribute.String;
    public: Attribute.Boolean;
    vendoruuid: Attribute.String;
    path: Attribute.String;
    type: Attribute.String;
    size: Attribute.Integer;
    keyword: Attribute.String;
    colloborator: Attribute.String;
    cdnpath: Attribute.String;
    expirydate: Attribute.Date;
    assetuuid: Attribute.UID<'api::asset.asset', 'vendoruuid'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::asset.asset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::asset.asset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiChapterChapter extends Schema.CollectionType {
  collectionName: 'chapters';
  info: {
    singularName: 'chapter';
    pluralName: 'chapters';
    displayName: 'chapter';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    chapter_title: Attribute.String;
    chapter_brief: Attribute.RichText;
    chapter_duration: Attribute.Integer;
    chapter_content: Attribute.RichText;
    chapter_resource: Attribute.String;
    chapter_video: Attribute.String;
    chapter_author: Attribute.String;
    chapter_order: Attribute.Integer;
    courseunitid: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::chapter.chapter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::chapter.chapter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConfigConfig extends Schema.CollectionType {
  collectionName: 'configs';
  info: {
    singularName: 'config';
    pluralName: 'configs';
    displayName: 'config';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    key: Attribute.String;
    value: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config.config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config.config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactContact extends Schema.CollectionType {
  collectionName: 'contacts';
  info: {
    singularName: 'contact';
    pluralName: 'contacts';
    displayName: 'contact';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    username: Attribute.String;
    email: Attribute.Email;
    phoneNo: Attribute.String;
    country: Attribute.String;
    address: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCourseCourse extends Schema.CollectionType {
  collectionName: 'courses';
  info: {
    singularName: 'course';
    pluralName: 'courses';
    displayName: 'course';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    course_title: Attribute.String;
    course_brief: Attribute.RichText;
    course_fee: Attribute.Integer & Attribute.DefaultTo<0>;
    instructor: Attribute.String;
    course_fee_premium: Attribute.Integer & Attribute.DefaultTo<0>;
    language: Attribute.String;
    introductory_video: Attribute.String;
    metadata: Attribute.String;
    duration: Attribute.Integer & Attribute.DefaultTo<0>;
    course_logo: Attribute.String;
    course_outline: Attribute.RichText;
    enrollment_count: Attribute.Integer & Attribute.DefaultTo<0>;
    instrucctorName: Attribute.String;
    assesmentCount: Attribute.String;
    course_requirement: Attribute.RichText;
    course_testimonial: Attribute.RichText;
    rating: Attribute.Integer;
    reviewUserCount: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCoursequeryCoursequery extends Schema.CollectionType {
  collectionName: 'coursequeries';
  info: {
    singularName: 'coursequery';
    pluralName: 'coursequeries';
    displayName: 'coursequery';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    question_txt: Attribute.Text;
    question_attachment: Attribute.String;
    courseid: Attribute.String;
    studentid: Attribute.String;
    answer: Attribute.Text;
    answer_attachment: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::coursequery.coursequery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::coursequery.coursequery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCourseunitCourseunit extends Schema.CollectionType {
  collectionName: 'courseunits';
  info: {
    singularName: 'courseunit';
    pluralName: 'courseunits';
    displayName: 'courseunit';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    unit_title: Attribute.String;
    unit_brief: Attribute.RichText;
    metadata: Attribute.String;
    unit_introductory_video: Attribute.String;
    unit_duration: Attribute.Integer;
    courseid: Attribute.String;
    course_unit_order: Attribute.Integer;
    labproject: Attribute.RichText;
    labproject_attachment: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::courseunit.courseunit',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::courseunit.courseunit',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCustomerCustomer extends Schema.CollectionType {
  collectionName: 'customers';
  info: {
    singularName: 'customer';
    pluralName: 'customers';
    displayName: 'customer';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    customeremail: Attribute.String;
    customername: Attribute.String;
    customerphone: Attribute.String;
    customeraddress: Attribute.String;
    customercity: Attribute.String;
    customercountry: Attribute.String;
    customerremarks: Attribute.String;
    dob: Attribute.Date;
    attachments: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::customer.customer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::customer.customer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCustomerenquiryCustomerenquiry
  extends Schema.CollectionType {
  collectionName: 'customerenquiries';
  info: {
    singularName: 'customerenquiry';
    pluralName: 'customerenquiries';
    displayName: 'customerenquiry';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    customername: Attribute.String;
    customeremail: Attribute.String;
    customerphone: Attribute.String;
    enquirydate: Attribute.Date;
    enquirycountry: Attribute.String;
    processedstatus: Attribute.String;
    description: Attribute.Text;
    attachment: Attribute.String;
    answer: Attribute.RichText;
    answer_attachment: Attribute.String;
    sourceip: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::customerenquiry.customerenquiry',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::customerenquiry.customerenquiry',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEnrollmentEnrollment extends Schema.CollectionType {
  collectionName: 'enrollments';
  info: {
    singularName: 'enrollment';
    pluralName: 'enrollments';
    displayName: 'enrollment';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    customeremail: Attribute.String;
    course: Attribute.String;
    enrollment_date: Attribute.String;
    is_paid: Attribute.Enumeration<['standard', 'premium']>;
    orderid: Attribute.String;
    order_transaction: Attribute.String;
    payment_status: Attribute.Boolean & Attribute.DefaultTo<false>;
    amount: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::enrollment.enrollment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::enrollment.enrollment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFeedbackFeedback extends Schema.CollectionType {
  collectionName: 'feedbacks';
  info: {
    singularName: 'feedback';
    pluralName: 'feedbacks';
    displayName: 'feedback';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    customeremail: Attribute.String;
    customername: Attribute.String;
    enrollment: Attribute.String;
    rating_score: Attribute.Integer;
    feedback_text: Attribute.RichText;
    metadata: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::feedback.feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::feedback.feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHeaderfooterHeaderfooter extends Schema.CollectionType {
  collectionName: 'headerfooters';
  info: {
    singularName: 'headerfooter';
    pluralName: 'headerfooters';
    displayName: 'headerfooter';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    published: Attribute.Boolean;
    author: Attribute.String;
    header_html_element: Attribute.RichText;
    footer_html_element: Attribute.RichText;
    header_footer_json: Attribute.Blocks;
    clientsidelibs: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::headerfooter.headerfooter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::headerfooter.headerfooter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInstructorInstructor extends Schema.CollectionType {
  collectionName: 'instructors';
  info: {
    singularName: 'instructor';
    pluralName: 'instructors';
    displayName: 'instructor';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    display_name: Attribute.String;
    instructoremail: Attribute.String;
    qualification: Attribute.Enumeration<
      [
        'below_graduate',
        'graduate',
        'master',
        'professional_graduate',
        'phd',
        'ca',
        'technical_graduate'
      ]
    >;
    introduction_brief: Attribute.RichText;
    published_course_count: Attribute.Integer;
    enrollment_student_count: Attribute.Integer;
    average_rating: Attribute.Integer;
    work_exp_yr: Attribute.Integer;
    intro_video_url: Attribute.String;
    copyright_hold: Attribute.String;
    linkedin_url: Attribute.String;
    education_institute: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::instructor.instructor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::instructor.instructor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInvoiceInvoice extends Schema.CollectionType {
  collectionName: 'invoices';
  info: {
    singularName: 'invoice';
    pluralName: 'invoices';
    displayName: 'invoice';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    customeremail: Attribute.String;
    course: Attribute.String;
    invoicedate: Attribute.Date;
    invoiceamount: Attribute.Integer;
    invoicetax: Attribute.Integer;
    invoicetotal: Attribute.Integer;
    inovicediscount: Attribute.Integer;
    invoicedescription: Attribute.RichText;
    paidstatus: Attribute.Boolean & Attribute.DefaultTo<false>;
    paiddate: Attribute.Date;
    invoicepdf: Attribute.String;
    transactionid: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiJobpostJobpost extends Schema.CollectionType {
  collectionName: 'jobposts';
  info: {
    singularName: 'jobpost';
    pluralName: 'jobposts';
    displayName: 'jobpost';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    organization_name: Attribute.String;
    organization_url: Attribute.String;
    post_title: Attribute.Text;
    post_description: Attribute.RichText;
    post_attachment: Attribute.String;
    start_date: Attribute.Date;
    end_date: Attribute.Date;
    metadata: Attribute.String;
    contact_person: Attribute.String;
    comments: Attribute.RichText;
    qualification_required: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::jobpost.jobpost',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::jobpost.jobpost',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLabprojectLabproject extends Schema.CollectionType {
  collectionName: 'labprojects';
  info: {
    singularName: 'labproject';
    pluralName: 'labprojects';
    displayName: 'labproject';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    customerid: Attribute.String;
    courseid: Attribute.String;
    unit: Attribute.String;
    instructor: Attribute.String;
    description: Attribute.RichText;
    attachment: Attribute.String;
    answer: Attribute.RichText;
    answerattachment: Attribute.String;
    status: Attribute.String;
    marks: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::labproject.labproject',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::labproject.labproject',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLearningprogressLearningprogress
  extends Schema.CollectionType {
  collectionName: 'learningprogresses';
  info: {
    singularName: 'learningprogress';
    pluralName: 'learningprogresses';
    displayName: 'learningprogress';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    enrollment: Attribute.String;
    chapter: Attribute.String;
    begin_time: Attribute.Date;
    end_time: Attribute.Date;
    status: Attribute.Enumeration<['start', 'ongoing', 'finish']>;
    customeremail: Attribute.String;
    courseid: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::learningprogress.learningprogress',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::learningprogress.learningprogress',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOrderOrder extends Schema.CollectionType {
  collectionName: 'orders';
  info: {
    singularName: 'order';
    pluralName: 'orders';
    displayName: 'order';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    customeremail: Attribute.String;
    courseid: Attribute.String;
    sourceip: Attribute.String;
    amount: Attribute.Integer;
    payment_status: Attribute.Boolean & Attribute.DefaultTo<false>;
    transactionid: Attribute.String;
    payment_method: Attribute.String;
    remarks: Attribute.String;
    course_logo: Attribute.String;
    course_title: Attribute.String;
    oderid: Attribute.String;
    country: Attribute.String;
    state: Attribute.String;
    address: Attribute.String;
    instructor: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPagePage extends Schema.CollectionType {
  collectionName: 'pages';
  info: {
    singularName: 'page';
    pluralName: 'pages';
    displayName: 'page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    vendoruuid: Attribute.String;
    pagepath: Attribute.String;
    author: Attribute.String;
    type: Attribute.String;
    headerfooterid: Attribute.String;
    seo: Attribute.RichText;
    metadata: Attribute.RichText;
    css: Attribute.String;
    pagecss: Attribute.RichText;
    pagejs: Attribute.RichText;
    page_html_body: Attribute.RichText;
    page_html_hero: Attribute.RichText;
    page_html_promo: Attribute.RichText;
    published: Attribute.Boolean;
    page_html_menu: Attribute.RichText;
    menu: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPagemenuPagemenu extends Schema.CollectionType {
  collectionName: 'pagemenus';
  info: {
    singularName: 'pagemenu';
    pluralName: 'pagemenus';
    displayName: 'pagemenu';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    pageMenu: Attribute.RichText;
    menuAssets: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::pagemenu.pagemenu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::pagemenu.pagemenu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPublicassetPublicasset extends Schema.CollectionType {
  collectionName: 'publicassets';
  info: {
    singularName: 'publicasset';
    pluralName: 'publicassets';
    displayName: 'publicasset';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    filename: Attribute.String;
    filepath: Attribute.String;
    size: Attribute.Integer;
    author: Attribute.String;
    type: Attribute.String;
    publicpath: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::publicasset.publicasset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::publicasset.publicasset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQuestionQuestion extends Schema.CollectionType {
  collectionName: 'questions';
  info: {
    singularName: 'question';
    pluralName: 'questions';
    displayName: 'question';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    question_title: Attribute.Text;
    question_attachment: Attribute.String;
    option_a_text: Attribute.String;
    option_a_attachment: Attribute.String;
    option_a_is_answer: Attribute.Boolean & Attribute.DefaultTo<false>;
    option_b: Attribute.String;
    option_b_attachment: Attribute.String;
    option_b_is_answer: Attribute.Boolean & Attribute.DefaultTo<false>;
    option_c: Attribute.String;
    option_c_attachment: Attribute.String;
    option_c_is_answer: Attribute.Boolean & Attribute.DefaultTo<false>;
    option_d: Attribute.String;
    option_d_attachment: Attribute.String;
    option_d_is_answer: Attribute.Boolean & Attribute.DefaultTo<false>;
    option_e: Attribute.String;
    option_e_attachment: Attribute.String;
    option_e_is_answer: Attribute.Boolean & Attribute.DefaultTo<false>;
    marks: Attribute.Integer;
    suggestion_remarks: Attribute.String;
    suggestion_attachment: Attribute.String;
    metadata: Attribute.String;
    assesment_id: Attribute.String;
    questiontype: Attribute.String;
    courseid: Attribute.String;
    course_title: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::question.question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::question.question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRecepientlistRecepientlist extends Schema.CollectionType {
  collectionName: 'recepientlists';
  info: {
    singularName: 'recepientlist';
    pluralName: 'recepientlists';
    displayName: 'recepientlist';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    vendoruuid: Attribute.String;
    collection: Attribute.JSON;
    kekyword: Attribute.String;
    author: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::recepientlist.recepientlist',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::recepientlist.recepientlist',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiScoreScore extends Schema.CollectionType {
  collectionName: 'scores';
  info: {
    singularName: 'score';
    pluralName: 'scores';
    displayName: 'score';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    customeremail: Attribute.Email;
    customerAnswer: Attribute.Text;
    instructor: Attribute.String;
    courseid: Attribute.String;
    assesmentid: Attribute.String;
    totalScored: Attribute.Integer & Attribute.DefaultTo<0>;
    passMarks: Attribute.Integer & Attribute.DefaultTo<0>;
    fullMarks: Attribute.Integer & Attribute.DefaultTo<0>;
    assesment_title: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::score.score',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::score.score',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStudentStudent extends Schema.CollectionType {
  collectionName: 'students';
  info: {
    singularName: 'student';
    pluralName: 'students';
    displayName: 'student';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    email: Attribute.String;
    vendoruuid: Attribute.String;
    phone: Attribute.String;
    skills: Attribute.Blocks;
    qualification: Attribute.String;
    avatar: Attribute.String;
    active: Attribute.Boolean;
    remarks: Attribute.RichText;
    address: Attribute.String;
    smedia: Attribute.Blocks;
    paymentSummery: Attribute.Blocks;
    courses: Attribute.String;
    subscribeDomain: Attribute.String;
    dob: Attribute.Date;
    biography: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::student.student',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::student.student',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTaskTask extends Schema.CollectionType {
  collectionName: 'tasks';
  info: {
    singularName: 'task';
    pluralName: 'tasks';
    displayName: 'task';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    vendoruuid: Attribute.String;
    assignedto: Attribute.String;
    taskdescription: Attribute.RichText;
    status: Attribute.String;
    keyword: Attribute.String;
    author: Attribute.String;
    completed: Attribute.Boolean;
    startdt: Attribute.Date;
    enddt: Attribute.Date;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::task.task', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::task.task', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTemplateTemplate extends Schema.CollectionType {
  collectionName: 'templates';
  info: {
    singularName: 'template';
    pluralName: 'templates';
    displayName: 'template';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    template: Attribute.RichText;
    json: Attribute.JSON;
    html_element: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::template.template',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::template.template',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVendorVendor extends Schema.CollectionType {
  collectionName: 'vendors';
  info: {
    singularName: 'vendor';
    pluralName: 'vendors';
    displayName: 'vendor';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    vendorid: Attribute.String;
    name: Attribute.String;
    logo: Attribute.String;
    location: Attribute.String;
    address: Attribute.String;
    phone: Attribute.String;
    email: Attribute.String;
    specialization: Attribute.String;
    website: Attribute.String;
    enrollmentCount: Attribute.Integer;
    ownerName: Attribute.String;
    ownerEmail: Attribute.String;
    details: Attribute.RichText;
    remarks: Attribute.Blocks;
    active: Attribute.Boolean;
    gstin: Attribute.String;
    bankDetails: Attribute.String;
    vendoruuid: Attribute.UID<'api::vendor.vendor', 'vendorid'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vendor.vendor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vendor.vendor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVendoritemVendoritem extends Schema.CollectionType {
  collectionName: 'vendoritems';
  info: {
    singularName: 'vendoritem';
    pluralName: 'vendoritems';
    displayName: 'vendoritem';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    vendoruuid: Attribute.String;
    type: Attribute.String;
    category: Attribute.String;
    warranty: Attribute.String;
    expirydt: Attribute.Date;
    manual: Attribute.RichText;
    page: Attribute.String;
    cost: Attribute.Integer;
    origin: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vendoritem.vendoritem',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vendoritem.vendoritem',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVendorsupportVendorsupport extends Schema.CollectionType {
  collectionName: 'vendorsupports';
  info: {
    singularName: 'vendorsupport';
    pluralName: 'vendorsupports';
    displayName: 'vendorsupport';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ticketname: Attribute.String;
    vendoruuid: Attribute.String;
    ticketdesc: Attribute.Text;
    reporteremail: Attribute.String;
    reporterphone: Attribute.String;
    attachment: Attribute.String;
    status: Attribute.String;
    closed: Attribute.Boolean;
    createdate: Attribute.Date;
    ticketworkflow: Attribute.JSON;
    ticketcomment: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vendorsupport.vendorsupport',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vendorsupport.vendorsupport',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVendostaffVendostaff extends Schema.CollectionType {
  collectionName: 'vendostaffs';
  info: {
    singularName: 'vendostaff';
    pluralName: 'vendostaffs';
    displayName: 'vendostaff';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    email: Attribute.String;
    vendoruuid: Attribute.String;
    phone: Attribute.String;
    skills: Attribute.String;
    address: Attribute.String;
    smedia: Attribute.JSON;
    certification: Attribute.String;
    qualification: Attribute.String;
    staffType: Attribute.String;
    avatar: Attribute.String;
    active: Attribute.Boolean;
    payroll: Attribute.JSON;
    feedback: Attribute.Blocks;
    bankDetails: Attribute.String;
    rating: Attribute.String;
    biography: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vendostaff.vendostaff',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vendostaff.vendostaff',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::assesment.assesment': ApiAssesmentAssesment;
      'api::assesmentquestion.assesmentquestion': ApiAssesmentquestionAssesmentquestion;
      'api::assesmentreport.assesmentreport': ApiAssesmentreportAssesmentreport;
      'api::asset.asset': ApiAssetAsset;
      'api::chapter.chapter': ApiChapterChapter;
      'api::config.config': ApiConfigConfig;
      'api::contact.contact': ApiContactContact;
      'api::course.course': ApiCourseCourse;
      'api::coursequery.coursequery': ApiCoursequeryCoursequery;
      'api::courseunit.courseunit': ApiCourseunitCourseunit;
      'api::customer.customer': ApiCustomerCustomer;
      'api::customerenquiry.customerenquiry': ApiCustomerenquiryCustomerenquiry;
      'api::enrollment.enrollment': ApiEnrollmentEnrollment;
      'api::feedback.feedback': ApiFeedbackFeedback;
      'api::headerfooter.headerfooter': ApiHeaderfooterHeaderfooter;
      'api::instructor.instructor': ApiInstructorInstructor;
      'api::invoice.invoice': ApiInvoiceInvoice;
      'api::jobpost.jobpost': ApiJobpostJobpost;
      'api::labproject.labproject': ApiLabprojectLabproject;
      'api::learningprogress.learningprogress': ApiLearningprogressLearningprogress;
      'api::order.order': ApiOrderOrder;
      'api::page.page': ApiPagePage;
      'api::pagemenu.pagemenu': ApiPagemenuPagemenu;
      'api::publicasset.publicasset': ApiPublicassetPublicasset;
      'api::question.question': ApiQuestionQuestion;
      'api::recepientlist.recepientlist': ApiRecepientlistRecepientlist;
      'api::score.score': ApiScoreScore;
      'api::student.student': ApiStudentStudent;
      'api::task.task': ApiTaskTask;
      'api::template.template': ApiTemplateTemplate;
      'api::vendor.vendor': ApiVendorVendor;
      'api::vendoritem.vendoritem': ApiVendoritemVendoritem;
      'api::vendorsupport.vendorsupport': ApiVendorsupportVendorsupport;
      'api::vendostaff.vendostaff': ApiVendostaffVendostaff;
    }
  }
}
