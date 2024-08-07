import { model, Schema, Document, Model } from "mongoose";

interface IAccessiBeLicenseBase {
  companyName: string;
  email: string;
  addresses: string[];
  location?: {
    longitude: number;
    latitude: number;
  };
  domain: string;
  CName?: string;
  website: string;
  contactPersonName: string;
  phoneNumber?: string;
  licenseKey?: string;
  widgetInstallationProcedureType?: "cms" | "manual";
  active: boolean;
  expirationDate: Date;
  subscriptionType: string;
  subscriptionTier: string;
  subscriptionStatus: string;
  subscriptionStartDate: Date;
  subscriptionEndDate: Date;
  subscriptionRenewalDate: Date;
  subscriptionRenewalPrice: number;
  subscriptionRenewalCurrency: string;
  subscriptionRenewalPeriod: string;
  subscriptionRenewalPeriodUnit: string;
  subscriptionRenewalPeriodFrequency: number;
}

interface IAccessiBeLicense extends IAccessiBeLicenseBase, Document {}
export interface IAccessiBeLicenseLean extends IAccessiBeLicenseBase {}

const AccessiBeLicenseSchema = new Schema<IAccessiBeLicense>(
  {
    companyName: { type: String, required: true },
    addresses: { type: [String], required: true },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid email!`,
      },
      index: true,
    },
    location: {
      longitude: { type: Number },
      latitude: { type: Number },
    },
    domain: { type: String, required: true, index: true },
    CName: { type: String },
    website: { type: String, required: true },
    contactPersonName: { type: String, required: true },
    phoneNumber: { type: String },
    licenseKey: { type: String, index: true },
    widgetInstallationProcedureType: {
      type: String,
      enum: ["cms", "manual"],
    },
    active: { type: Boolean, required: true, default: true },
    expirationDate: { type: Date, required: true },
    subscriptionType: { type: String, required: true },
    subscriptionTier: { type: String, required: true },
    subscriptionStatus: { type: String, required: true },
    subscriptionStartDate: { type: Date, required: true, default: Date.now },
    subscriptionEndDate: { type: Date, required: true },
    subscriptionRenewalDate: { type: Date, required: true },
    subscriptionRenewalPrice: { type: Number, required: true },
    subscriptionRenewalCurrency: { type: String, required: true },
    subscriptionRenewalPeriod: { type: String, required: true },
    subscriptionRenewalPeriodUnit: { type: String, required: true },
    subscriptionRenewalPeriodFrequency: { type: Number, required: true },
  },
  { timestamps: true, strict: false },
);

AccessiBeLicenseSchema.virtual("isExpired").get(function () {
  return this.expirationDate < new Date();
});

export const AccessiBeLicenseModel: Model<IAccessiBeLicense> =
  model<IAccessiBeLicense>("AccessiBeLicense", AccessiBeLicenseSchema);
