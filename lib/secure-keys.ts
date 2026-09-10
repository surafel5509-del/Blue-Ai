import crypto from 'crypto'
import { cookies } from 'next/headers'
const COOKIE='lumina_keys'
function secret(){const s=process.env.APP_ENCRYPTION_KEY;if(!s)throw new Error('APP_ENCRYPTION_KEY is required');return crypto.createHash('sha256').update(s).digest()}
export function encrypt(value:unknown){const iv=crypto.randomBytes(12),key=secret(),c=crypto.createCipheriv('aes-256-gcm',key,iv);const data=Buffer.concat([c.update(JSON.stringify(value),'utf8'),c.final()]);return [iv.toString('base64url'),c.getAuthTag().toString('base64url'),data.toString('base64url')].join('.')}
export function decrypt<T>(token:string):T{const [iv,tag,data]=token.split('.'),key=secret(),d=crypto.createDecipheriv('aes-256-gcm',key,Buffer.from(iv,'base64url'));d.setAuthTag(Buffer.from(tag,'base64url'));return JSON.parse(Buffer.concat([d.update(Buffer.from(data,'base64url')),d.final()]).toString('utf8'))}
export async function readKeys(){const jar=await cookies();const raw=jar.get(COOKIE)?.value;return raw?decrypt<Record<string,string>>(raw):{}}
export async function saveKeys(keys:Record<string,string>){const jar=await cookies();jar.set(COOKIE,encrypt(keys),{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:60*60*24*30})}