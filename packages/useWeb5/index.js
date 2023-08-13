import { useEffect, useState, useRef } from "react";

/**
 * @typedef {Object} Web5Config - Web5 configuration object
 * @property {string} schemaUrl - URL to the schema file
 */

/**
 * @param {Web5Config} config - Web5 configuration object
 */

const defaultConfig = {
  schemaUrl: "http://some-schema-registry.org/notes",
  dataFormat: "text/plain" // see: https://www.iana.org/assignments/media-types/media-types.xhtml
};

export default function useWeb5(config = defaultConfig) {
  const [did, setDid] = useState(undefined);
  const web5Ref = useRef();

  const createRecord = async (data) => {
    const { record } = await web5Ref.current.dwn.records.create({
      data,
      message: {
        schema: config.schemaUrl,
        dataFormat: config.dataFormat
      }
    });
    return record;
  };

  const readRecord = async (recordId) => {
    const { record } = await web5Ref.current.dwn.records.read({
      message: {
        recordId,
      },
    });
    return record;
  };

  const updateRecord = async (recordId, data) => {
    const { record } = await web5Ref.current.dwn.records.read({
      message: {
        recordId,
      },
    });
    const response = await record.update({ data });
    return response;
  }

  const deleteRecord = async (recordId) => {
    const response = await web5Ref.current.dwn.records.delete({
      message: {
        recordId,
      },
    });
    return response;
  }

  useEffect(() => {
    async function initWeb5() {
      const { web5, did } = await Web5.connect();
      setDid(did);
      web5Ref.current = web5;
    }

    initWeb5();
  }, []);

  return {
    did,
    web5Ref,
    createRecord,
    updateRecord,
    readRecord,
    deleteRecord
  };
}