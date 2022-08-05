import moment from "moment";

/**
 * isEmpty method
 * @param obj
 */
export function isEmpty(obj: any): boolean {
  return !obj || obj.length === 0 || (Object.keys(obj).length === 0 && obj.constructor === Object);
}


/**
 * stringAvatar
 * @param name
 */
export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  };
}


/**
 * stringToColor
 * @param string 
 * @returns 
 */
function stringToColor(string: string): string {
  let hash = 0;
  let i: number;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}


/**
 * buildFetchOptions
 * @param method 
 * @param body
 */
export function buildFetchOptions(method: string, body = '') {
  return  {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
    }
  }
}


/**
 * get number of seconds since the Unix Epoch
 * @returns Get
 */
export function getTimestamp(): number {
  return moment(new Date()).unix()
}