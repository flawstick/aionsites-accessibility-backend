import { model, Schema, Document, Model } from "mongoose";

interface ICard {
  cardNumber: string;
  cardHolderName: string;
  expirationDate: Date;
  cvv: string;
  cardType: string;
}

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
  subscriptionCard: ICard;
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

const AccessiBeLicenseSchema = new Schema<IAccessiBeLicense>({
  companyName: { type: String, required: true },
  addresses: { type: [String], required: true },
  location: {
    longitude: { type: Number },
    latitude: { type: Number },
  },
  domain: { type: String, required: true },
  CName: { type: String },
  website: { type: String, required: true },
  contactPersonName: { type: String, required: true },
  phoneNumber: { type: String },
  licenseKey: { type: String },
  widgetInstallationProcedureType: { type: String },
  active: { type: Boolean, required: true },
  expirationDate: { type: Date, required: true },
  subscriptionCard: {
    cardNumber: { type: String, required: true },
    cardHolderName: { type: String, required: true },
    expirationDate: { type: Date, required: true },
    cvv: { type: String, required: true },
    cardType: { type: String, required: true },
  },
  subscriptionType: { type: String, required: true },
  subscriptionTier: { type: String, required: true },
  subscriptionStatus: { type: String, required: true },
  subscriptionStartDate: { type: Date, required: true },
  subscriptionEndDate: { type: Date, required: true },
  subscriptionRenewalDate: { type: Date, required: true },
  subscriptionRenewalPrice: { type: Number, required: true },
  subscriptionRenewalCurrency: { type: String, required: true },
  subscriptionRenewalPeriod: { type: String, required: true },
  subscriptionRenewalPeriodUnit: { type: String, required: true },
  subscriptionRenewalPeriodFrequency: { type: Number, required: true },
});

export const AccessiBeLicenseModel: Model<IAccessiBeLicense> =
  model<IAccessiBeLicense>("AccessiBeLicense", AccessiBeLicenseSchema);
