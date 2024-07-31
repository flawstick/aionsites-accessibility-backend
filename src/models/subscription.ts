import { model, Schema, Document, Model } from "mongoose";

interface IAccessiBeLicenseBase {
  subscriptionId: string;
  companyName: string;
  addresses: string[];
  location: {
    longitude: number;
    latitude: number;
  };
  domain: string;
  CName: string;
  website: string;
  contactPersonName: string;
  phoneNumber: string;
  licenseKey: string;
  widgetInstallationProcedureType: "cms" | "manual";
  expirationDate: Date;
  active: boolean;
  subscriptionCard: any;
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
  subscriptionRenewalPeriodFrequencyUnit: string;
  subscriptionRenewalPeriodFrequencyOffset: number;
  subscriptionRenewalPeriodFrequencyOffsetUnit: string;
  subscriptionRenewalPeriodFrequencyOffsetDirection: string;
  subscriptionRenewalPeriodFrequencyOffsetDirectionUnit: string;
  subscriptionRenewalPeriodFrequencyOffsetDirectionValue: number;
}

interface IAccessiBeLicense extends IAccessiBeLicenseBase, Document {}
export interface IAccessiBeLicenseLean extends IAccessiBeLicenseBase {}

const accessiBeLicenseSchema = new Schema<IAccessiBeLicense>(
  {
    subscriptionId: { type: String, required: true, unique: true },
    companyName: { type: String, required: true, unique: false },
    addresses: { type: [String], required: true, unique: false },
    location: {
      longitude: { type: Number, required: true, unique: false },
      latitude: { type: Number, required: true, unique: false },
    },
    domain: { type: String, required: true, unique: true },
    CName: { type: String, required: true, unique: true },
    widgetInstallationProcedureType: {
      type: String,
      required: true,
      unique: false,
    },
    website: { type: String, required: true, unique: true },
    CEOName: { type: String, required: true, unique: false },
    contactPersonName: { type: String, required: true, unique: false },
    phoneNumber: { type: String, required: true, unique: false },
    licenseKey: { type: String, required: true, unique: true },
    expirationDate: { type: Date, required: true, unique: false },
    active: { type: Boolean, required: true, unique: false },
    subscriptionCard: {
      type: Schema.Types.Mixed,
      required: true,
      unique: false,
    },
    subscriptionType: { type: String, required: true, unique: false },
    subscriptionTier: { type: String, required: true, unique: false },
    subscriptionStatus: { type: String, required: true, unique: false },
    subscriptionStartDate: { type: Date, required: true, unique: false },
    subscriptionEndDate: { type: Date, required: true, unique: false },
    subscriptionRenewalDate: { type: Date, required: true, unique: false },
    subscriptionRenewalPrice: { type: Number, required: true, unique: false },
    subscriptionRenewalCurrency: {
      type: String,
      required: true,
      unique: false,
    },
    subscriptionRenewalPeriod: { type: String, required: true, unique: false },
    subscriptionRenewalPeriodUnit: {
      type: String,
      required: true,
      unique: false,
    },
    subscriptionRenewalPeriodFrequency: {
      type: Number,
      required: true,
      unique: false,
    },
    subscriptionRenewalPeriodFrequencyUnit: {
      type: String,
      required: true,
      unique: false,
    },
    subscriptionRenewalPeriodFrequencyOffset: {
      type: Number,
      required: true,
      unique: false,
    },
    subscriptionRenewalPeriodFrequencyOffsetUnit: {
      type: String,
      required: true,
      unique: false,
    },
    subscriptionRenewalPeriodFrequencyOffsetDirection: {
      type: String,
      required: true,
      unique: false,
    },
    subscriptionRenewalPeriodFrequencyOffsetDirectionUnit: {
      type: String,
      required: true,
      unique: false,
    },
    subscriptionRenewalPeriodFrequencyOffsetDirectionValue: {
      type: Number,
      required: true,
      unique: false,
    },
  },
  { timestamps: true, strict: false },
);

const AccessiBeLicenseModel: Model<IAccessiBeLicense> =
  model<IAccessiBeLicense>("accessiBeLicense", accessiBeLicenseSchema);
export default AccessiBeLicenseModel;
